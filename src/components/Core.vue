<script setup lang="ts">
import Matter, { Mouse, Body, Render, Vector, Events } from "matter-js";
import { onMounted } from "vue";
/* @ts-ignore */
import * as PolyDecomp from "poly-decomp";
import { BellControls } from "../controls/bellControls";
import { MouseInput } from "../controls/mouseInput";
import { UserInputHandler } from "../controls/userInput";
import { Camera } from "../utils/camera";
import { ObjectPool } from "../engine/ObjectPool";
import { Particle, ParticleSystem } from "../engine/ParticleSystem";
import { HoleManager } from "../engine/HoleManager";
import { Cursor } from "../engine/Cursor";
import "../utils/svgs";

import SubMarine from "../assets/SubMarine.png";
import Bubble01 from "../assets/bubble-01.png";
import Bubble02 from "../assets/bubble-02.png";
import Bubble03 from "../assets/bubble-03.png";
import Bubble04 from "../assets/bubble-04.png";
import Bubble05 from "../assets/bubble-05.png";
import Bubble06 from "../assets/bubble-06.png";
import { TERRAIN_1, TERRAIN_2 } from "../terrain";
import HealthBar from "./HealthBar.vue";
import { HealthBarHandler } from "../controls/healthBar";
import { createStructuralDirectiveTransform } from "@vue/compiler-core";

/*
    REASONS for custom Renderer:
        - no gradients
        - no z-index of objects
*/

// module aliases
const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

Matter.Common.setDecomp(PolyDecomp);

// create an engine
const engine = Engine.create({
    gravity: {
        x: 0,
        y: 0,
    },
});

const screenDimensions = {
    width: 1080,
    height: 1920,
};
const screenCenter = {
    x: screenDimensions.width / 2,
    y: screenDimensions.height / 2,
};

const terrainDimensions = {
    width: 6971,
    height: 7610,
};
const terrainCenter = {
    x: terrainDimensions.width / 2,
    y: terrainDimensions.height / 2,
};

const bubbleAssets = [Bubble01, Bubble02, Bubble03, Bubble04, Bubble05, Bubble06];
const getRandomBubbleAsset = () => {
    const randIdx = Math.ceil(Math.random() * 5);
    return bubbleAssets[randIdx];
};

const bubbleCreator = () => {
    const randomScale = Math.random() * 0.1;
    const bubble = Bodies.circle(0, 0, 10, {
        collisionFilter: {
            group: -1,
            category: 4,
            mask: 2,
        },
        render: {
            sprite: {
                texture: getRandomBubbleAsset(),
                xScale: randomScale,
                yScale: randomScale,
            },
        },
        label: "bubble",
    });
    (bubble as Particle).age = 0;

    // Body.applyForce(bubble, bubble.position, Vector.create(0, -0.003));

    return bubble as Particle;
};

Events.on(engine, "collisionStart", (e) => {
    e.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === "bubble") (bodyA as Particle).age = 1.7;
        if (bodyB.label === "bubble") (bodyB as Particle).age = 1.7;
    });
});

const bubbleObjectPool = new ObjectPool(bubbleCreator, 200);

const bell = Bodies.circle(3520, 7550, 80, {
    frictionAir: 0.03,
    inertia: Infinity,
    inverseInertia: 0,
    restitution: 2,
    render: {
        sprite: {
            texture: SubMarine,
            yScale: 0.4,
            xScale: 0.4,
        },
    },
});

const bellControls = new BellControls(bell, engine);
const userInputHandler = new UserInputHandler(document.body, bell);
const healthBar = new HealthBarHandler(bellControls, engine);
const holeManager = new HoleManager(bell, engine);

const particleSystems: ParticleSystem<Particle>[] = [];

userInputHandler.registerCallback((inputForce) => {
    moveBell(inputForce);
});

const moveBell = (direction: Vector) => {
    //move the bell
    bellControls.addForce(direction);

    //add visible hole in the bell
    holeManager.createHole(direction);

    //add bubble-particle system
    particleSystems.push(
        new ParticleSystem(engine, bubbleObjectPool, (instance) => {
            const reverseForceInput = Vector.mult(direction, -1);
            const orthogonalForce = Vector.mult(
                Vector.create(reverseForceInput.y, reverseForceInput.x),
                (Math.random() - 0.5) * 0.4
            );
            Body.setPosition(instance, Vector.add(bell.position, Vector.mult(reverseForceInput, 80)));
            Body.setVelocity(instance, Vector.mult(Vector.add(reverseForceInput, orthogonalForce), 3));
            Body.setAngularVelocity(instance, 0.001);
        })
    );
};

let render: Render;

onMounted(() => {
    // create a renderer
    render = Render.create({
        element: document.querySelector<HTMLElement>("#core")!,
        engine: engine,

        options: {
            showPerformance: true,
            showCollisions: false,
            wireframes: false,
            showBounds: false,
            ...screenDimensions,
        },
    });

    new Camera(bell, engine, render, screenDimensions);

    // create ground + left and right mock terrain
    const background = Bodies.rectangle(
        terrainCenter.x,
        terrainCenter.y,
        terrainDimensions.width,
        terrainDimensions.height * 1.5,
        {
            collisionFilter: {
                category: 0,
                mask: 0,
            },
            render: { fillStyle: "midnightblue" },
        }
    );

    // add all of the bodies to the world
    Composite.add(engine.world, [background, bell]);

    // Bodies.fromSvg("/svg/terrain-2/terrain-center-2.svg", 1, terrainCenter.x, 0, [], {
    //     collisionFilter: {
    //         category: -1,
    //         mask: 12,
    //         group: 33,
    //     },
    // }).then((svg) => (console.log(svg), Composite.add(engine.world, svg)));

    const terrainObject = TERRAIN_2.map((obj) =>
        Bodies.fromVertices(
            obj.position.x,
            obj.position.y,
            [obj.vertices.map((vector) => Vector.create(vector.x, vector.y))],
            {
                isStatic: true,
                collisionFilter: {
                    category: 2,
                    mask: -1,
                },
            }
        )
    );
    Composite.add(engine.world, terrainObject);

    const mouse = Mouse.create(render.canvas);
    const mouseInput = new MouseInput(document.body, mouse, bell, render);
    userInputHandler.setMouseInput(mouseInput);
    const cursor = new Cursor(mouseInput, bell, render, engine);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
});
</script>

<template>
    <div class="wrapper">
        <div id="core"></div>
        <div class="health-bar">
            <HealthBar :health="healthBar.health.value" />
        </div>
    </div>
</template>

<style>
.wrapper {
    width: 100vw;
    height: 100vh;
    position: relative;
}
canvas {
    height: 100vh;
    object-fit: contain;
}
.health-bar {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
