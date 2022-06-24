<script setup lang="ts">
import Matter, { Body, Common, Render, Vector } from "matter-js";
import { onMounted } from "vue";
import * as PolyDecomp from "poly-decomp";
import { BellControls } from "../controls/bellControls";
import { UserInputHandler } from "../controls/userInput";
import { Camera } from "../utils/camera";
import SubMarine from "../assets/SubMarine.png";
import Bubble01 from "../assets/bubble-01.png";
import Bubble02 from "../assets/bubble-02.png";
import Bubble03 from "../assets/bubble-03.png";
import Bubble04 from "../assets/bubble-04.png";
import Bubble05 from "../assets/bubble-05.png";
import Bubble06 from "../assets/bubble-06.png";
import { ObjectPool } from "../engine/ObjectPool";
import { ParticleSystem } from "../engine/ParticleSystem";

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

    Body.applyForce(bubble, bubble.position, Vector.create(0, -0.003));

    return bubble;
};

const bubbleObjectPool = new ObjectPool(bubbleCreator, 400);

const bell = Bodies.circle(center.x, appDimensions.height - 60, 100, {
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
                (Math.random() - 0.5) * 2 * 0.2
            );
            Body.setPosition(instance, Vector.add(bell.position, Vector.mult(reverseForceInput, 50)));
            Body.setVelocity(instance, Vector.mult(Vector.add(reverseForceInput, orthogonalForce), 3));
            Body.setAngularVelocity(instance, 0.001);
        })
    );
};

let render: Render;

onMounted(() => {
    //convert SVGs to Bodies
    const bodies = Array.from(document.querySelectorAll<SVGPathElement>("svg > path")).map((path) => {
        return Matter.Bodies.fromVertices(center.x, center.y, [Matter.Svg.pathToVertices(path, 15)], {}, true);
    });

    // create a renderer
    render = Render.create({
        element: document.querySelector<HTMLElement>("#core")!,
        engine: engine,

        options: {
            showCollisions: true,
            showPerformance: true,
            wireframes: false,
            ...appDimensions,
        },
    });

    const camera = new Camera(bell, engine, render, appDimensions);

    // create ground + left and right mock terrain
    const boxA = Bodies.rectangle(0, appDimensions.height, 80, appDimensions.height, { isStatic: true });
    const boxB = Bodies.rectangle(appDimensions.width, appDimensions.height, 80, appDimensions.height, {
        isStatic: true,
    });
    const ground = Bodies.rectangle(appDimensions.width / 2, appDimensions.height, appDimensions.width, 60, {
        isStatic: true,
    });

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground, bell, ...bodies]);
    Composite.remove(engine.world, boxA);

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

    <!-- SVG Assets
    <svg style="display: none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080" xml:space="preserve">
        <path style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(101,101,101); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-50.5, -50)" d="M 22.66 19.967 C 17.585 19.967 13.448 24.104 13.448 29.180999999999997 L 13.448 78.31 C 13.448 83.387 17.585 87.584 22.723 87.584 L 71.791 87.584 C 76.868 87.584 81.065 83.387 81.065 78.31 C 80.814 71.479 63.769999999999996 68.974 51.613 63.646 L 85.765 29.494999999999997 C 88.146 27.051 88.146 23.165 85.765 20.784 L 79.187 14.203999999999999 C 76.803 11.822999999999999 72.919 11.822999999999999 70.538 14.203999999999999 L 36.76 47.981 C 31.998 36.137 29.616 20.846 22.66 19.967 z" stroke-linecap="round" />
    </svg>
    -->
</template>

<style>
canvas {
    height: 100vh;
    object-fit: contain;
}
</style>
