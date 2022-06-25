<script setup lang="ts">
import Matter, { Mouse, Body, Render, Vector, MouseConstraint } from "matter-js";
import { onMounted } from "vue";
/* @ts-ignore */
import * as PolyDecomp from "poly-decomp";
import { BellControls } from "../controls/bellControls";
import { MouseInput } from "../controls/mouseInput";
import { UserInputHandler } from "../controls/userInput";
import { Camera } from "../utils/camera";
import { ObjectPool } from "../engine/ObjectPool";
import { ParticleSystem } from "../engine/ParticleSystem";
import "../utils/svgs";

import SubMarine from "../assets/SubMarine.png";
import Bubble01 from "../assets/bubble-01.png";
import Bubble02 from "../assets/bubble-02.png";
import Bubble03 from "../assets/bubble-03.png";
import Bubble04 from "../assets/bubble-04.png";
import Bubble05 from "../assets/bubble-05.png";
import Bubble06 from "../assets/bubble-06.png";

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

const appDimensions = {
    width: 1080,
    height: 1920,
};

const center = {
    x: appDimensions.width / 2,
    y: appDimensions.height / 2,
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
            category: 0,
            mask: 0,
        },
        render: {
            sprite: {
                texture: getRandomBubbleAsset(),
                xScale: randomScale,
                yScale: randomScale,
            },
        },
    });

    // Body.applyForce(bubble, bubble.position, Vector.create(0, -0.003));

    return bubble;
};

const bubbleObjectPool = new ObjectPool(bubbleCreator, 400);

const bell = Bodies.circle(center.x, appDimensions.height - 260, 100, {
    frictionAir: 0.03,
    inertia: Infinity,
    inverseInertia: 0,
    restitution: 2,
    render: {
        sprite: {
            texture: SubMarine,
            yScale: 0.5,
            xScale: 0.5,
        },
    },
});

const bellControls = new BellControls(bell, engine);
const userInputHandler = new UserInputHandler(document.body, bell);

const particleSystems: ParticleSystem<Body>[] = [];

userInputHandler.registerCallback((inputForce) => {
    moveBell(inputForce);
});

const moveBell = (direction: Vector) => {
    bellControls.addForce(direction);

    particleSystems.push(
        new ParticleSystem(engine, bubbleObjectPool, (instance) => {
            const reverseForceInput = Vector.mult(direction, -1);
            const orthogonalForce = Vector.mult(
                Vector.create(reverseForceInput.y, reverseForceInput.y),
                (Math.random() - 0.5) * 0.4
            );
            Body.setPosition(instance, Vector.add(bell.position, Vector.mult(reverseForceInput, 50)));
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
            showCollisions: true,
            showPerformance: true,
            wireframes: false,
            showBounds: true,
            ...appDimensions,
        },
    });

    new Camera(bell, engine, render, appDimensions);

    // create ground + left and right mock terrain
    const background = Bodies.rectangle(
        center.x * -1,
        center.y * -4,
        appDimensions.width * 4,
        appDimensions.height * 10,
        {
            collisionFilter: {
                group: -1,
                category: 2,
                mask: 0,
            },
            render: { fillStyle: "midnightblue" },
        }
    );
    const wallLeft = Bodies.rectangle(0, appDimensions.height * -4, 80, appDimensions.height * 10, { isStatic: true });
    const wallRight = Bodies.rectangle(appDimensions.width, appDimensions.height * -4, 80, appDimensions.height * 10, {
        isStatic: true,
    });
    const ground = Bodies.rectangle(appDimensions.width / 2, appDimensions.height, appDimensions.width, 60, {
        isStatic: true,
    });

    // add all of the bodies to the world
    Composite.add(engine.world, [background, wallLeft, wallRight, ground, bell]);

    // Bodies.fromSvg("/svg/Mediamodifier-Design.svg", 4, center.x, center.y, []).then((svg) =>
    //     Composite.add(engine.world, svg)
    // );

    const mouse = Mouse.create(render.canvas);
    const mouseInput = new MouseInput(mouse, bell, render);
    userInputHandler.setMouseInput(mouseInput);

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
    <div id="core"></div>
</template>

<style>
canvas {
    height: 100vh;
    object-fit: contain;
}
</style>
