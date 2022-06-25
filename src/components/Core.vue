<script setup lang="ts">
import Matter, { Mouse, Render } from "matter-js";
/* @ts-ignore */
import * as PolyDecomp from "poly-decomp";
import { onMounted } from "vue";
import SubMarine from "../assets/SubMarine.png";
import { BellControls } from "../controls/bellControls";
import { MouseInput } from "../controls/mouseInput";
import { UserInputHandler } from "../controls/userInput";
import { Camera } from "../utils/camera";
import "../utils/svgs";

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

userInputHandler.registerCallback((input) => bellControls.addForce(input));

let render: Render;

onMounted(() => {
    // create a renderer
    render = Render.create({
        element: document.querySelector<HTMLElement>("#core")!,
        engine: engine,

        options: {
            showAxes: true,
            showIds: true,
            showCollisions: true,
            showPerformance: true,
            showInternalEdges: true,
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
            render: { fillStyle: "lightblue" },
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

    Bodies.fromSvg("/svg/Mediamodifier-Design.svg", 4, center.x, center.y, []).then((svg) =>
        Composite.add(engine.world, svg)
    );

    var mouse = Mouse.create(render.canvas);
    new MouseInput(mouse, bell, render);

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
