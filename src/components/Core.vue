<script setup lang="ts">
import Matter, { Mouse, Body, Render, Vector, Events, Common, IPair } from "matter-js";
import { onMounted, ref } from "vue";
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
import { Station } from "../engine/Station";
import { WinCon } from "../engine/WinCon";
import { ThreeCanvas } from "../engine/three-canvas";

import SubMarine from "../assets/SubMarine.png";
import Bubble01 from "../assets/bubble-01.png";
import Bubble02 from "../assets/bubble-02.png";
import Bubble03 from "../assets/bubble-03.png";
import Bubble04 from "../assets/bubble-04.png";
import Bubble05 from "../assets/bubble-05.png";
import Bubble06 from "../assets/bubble-06.png";
import Background from "../assets/bg3.png";
import TerrainTexture from "../assets/terrain-texture2.png";
import HealthBar from "./HealthBar.vue";
import Debug from "./Debug.vue";
import { HealthBarHandler } from "../controls/healthBar";
import { TERRAIN_1, TERRAIN_2, TERRAIN_3 } from "../terrain";
import { Sound, SoundPlayer } from "../utils/sound";
import WonRepresentation from "./WonRepresentation.vue";
import SubMarie from "./SubMarie.vue";
import { FishBody, Fishy } from "../engine/Fishies";

/*
    REASONS for custom Renderer:
        - no gradients
        - no z-index of objects
*/
const soundPlayer = new SoundPlayer();

// module aliases
const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

Matter.Common.setDecomp(PolyDecomp);

let showSubMarieStartMessage = ref(false);

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
    width: 6781,
    height: 9486,
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

const bubbleObjectPool = new ObjectPool(bubbleCreator, 1000);

const bellStartPosition = {
    x: 3294,
    y: 9367,
} as const;
const bell = Bodies.circle(bellStartPosition.x, bellStartPosition.y, 80, {
    friction: 0.07,
    frictionAir: 0.03,
    inertia: Infinity,
    inverseInertia: 0,
    restitution: 1.4,
    render: {
        sprite: {
            texture: SubMarine,
            yScale: 0.4,
            xScale: 0.4,
        },
    },
});

const bellControls = new BellControls(bell, engine, soundPlayer);
const userInputHandler = new UserInputHandler(document.body, bell);
const holeManager = new HoleManager(bell, engine);
const healthBar = new HealthBarHandler(bellControls, engine, soundPlayer);

//on oxygen empty, game over
healthBar.register(() => {
    soundPlayer.stopAllSfx();
    soundPlayer.stopAmbient();
    soundPlayer.playSfx("game_over");

    userInputHandler.enabled = false;
    particleSystems.forEach((ps) => {
        ps.stop();
    });
    bellControls.reset();
    bell.frictionAir = 0.005;

    window.setTimeout(() => {
        if (healthBar.health.value > 0) {
            return;
        }
        bellControls.reset();
        bell.frictionAir = 0.03;
        particleSystems.forEach((ps) => ps.clear());
        particleSystems.splice(0, particleSystems.length);
        holeManager.reset(true);
        healthBar.reset();
        Body.setPosition(bell, Vector.create(bellStartPosition.x, bellStartPosition.y));
        userInputHandler.enabled = true;
        soundPlayer.playAmbient("level_music");
    }, 4000);
});

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
    let bubbleCount = 0;
    particleSystems.push(
        new ParticleSystem(engine, bubbleObjectPool, (instance) => {
            // TODO bubble sounds
            // if (++bubbleCount % 10 === 0) {
            //     soundPlayer.playSfxAsync(
            //         ("bubble_" + Math.floor(Common.random(2, 5))) as Sound,
            //         Common.random(0.2, 0.6)
            //     );
            //     bubbleCount = 0;
            // }
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

const onWon = async () => {
    soundPlayer.playAmbient("win", false, 0.8);
    soundPlayer.stopAllSfx();

    bellControls.reset();
    userInputHandler.enabled = false;
    particleSystems.forEach((ps) => {
        ps.stop();
    });
    healthBar.stopBreathing();
};

const onPlayAgain = () => {
    soundPlayer.playAmbient("level_music");
    holeManager.reset(true);
    userInputHandler.enabled = true;
    particleSystems.forEach((ps) => ps.clear());
    particleSystems.splice(0, particleSystems.length);
    healthBar.reset();
    Body.setPosition(bell, Vector.create(bellStartPosition.x, bellStartPosition.y));
    showSubMarieStartMessage.value = true;
    window.setTimeout(() => (showSubMarieStartMessage.value = false), 15000);
};
const winCon = new WinCon(bell, engine, onWon, onPlayAgain);

// Setu Collision Events
Events.on(engine, "collisionStart", (e) => {
    e.pairs.forEach(({ bodyA, bodyB }: { bodyA: Body; bodyB: Body }) => {
        if (bodyA.label === "bubble") (bodyA as Particle).age = 1.7;
        if (bodyB.label === "bubble") (bodyB as Particle).age = 1.7;
        if ((bodyA === bell && bodyB.label === "terrain") || (bodyB === bell && bodyB.label === "terrain")) {
            soundPlayer.playSfx("hit_fast", false, true, 1);
        }
        if (bodyA.label === "fish") {
            (bodyA as FishBody).fishForce = Fishy.getNewFishForce();
        }
        if (bodyB.label === "fish") {
            (bodyB as FishBody).fishForce = Fishy.getNewFishForce();
        }
    });
});
Events.on(engine, "collisionActive", (e) => {
    e.pairs.forEach(({ bodyA, bodyB, contacts }: IPair) => {
        if (bodyA.label === "fish") {
            (bodyA as FishBody).fishForce = Fishy.getNewFishForce();
        }
        if (bodyB.label === "fish") {
            (bodyB as FishBody).fishForce = Fishy.getNewFishForce();
        }
    });
});

let render: Render;
onMounted(() => {
    //the canvas we draw our game on
    const canvas = document.querySelector<HTMLCanvasElement>("#matter-canvas")!;

    onPlayAgain();
    // create a renderer
    render = Render.create({
        canvas,
        //element: document.querySelector<HTMLElement>("#core")!,
        engine: engine,

        options: {
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
        terrainCenter.y - 1200,
        terrainDimensions.width,
        terrainDimensions.height,
        {
            collisionFilter: {
                category: 0,
                mask: 0,
            },
            render: {
                sprite: {
                    texture: Background,
                    xScale: 2,
                    yScale: 2,
                },
            },
        }
    );

    // add all of the bodies to the world
    Composite.add(engine.world, [background, bell]);

    // new Fishy(engine);
    // new Fishy(engine);
    // new Fishy(engine);
    // new Fishy(engine);
    // new Fishy(engine);
    // new Fishy(engine);
    // new Fishy(engine);

    // Bodies.fromSvg("/svg/terrain-paths2.svg", 1, terrainCenter.x - 70, terrainCenter.y + 470, [], {
    //     collisionFilter: {
    //         group: -2,
    //         category: 2,
    //         mask: -1,
    //     },
    //     isStatic: true,
    // }).then((svg) => Composite.add(engine.world, svg));

    const terrainObject = TERRAIN_3.map((obj) =>
        Bodies.fromVertices(
            obj.position.x,
            obj.position.y,
            obj.vertices.map((vecList) => vecList.map((vector) => Vector.create(vector.x, vector.y))),
            {
                isStatic: true,
                collisionFilter: {
                    category: 2,
                    mask: -1,
                },
                render: {
                    fillStyle: "#030714",
                },
                label: "terrain",
            }
        )
    );
    const terrainTexture = Bodies.rectangle(
        terrainCenter.x - 30,
        terrainCenter.y + 320,
        terrainDimensions.width,
        terrainDimensions.height,
        {
            render: {
                sprite: {
                    texture: TerrainTexture,
                    xScale: 2,
                    yScale: 2,
                },
            },
            collisionFilter: {
                category: 0,
                mask: 0,
            },
            isStatic: true,
        }
    );
    Composite.add(engine.world, [...terrainObject, terrainTexture]);

    const mouse = Mouse.create(render.canvas);
    const mouseInput = new MouseInput(document.body, mouse, bell, render);
    userInputHandler.setMouseInput(mouseInput);
    const cursor = new Cursor(mouseInput, bell, render, engine);

    [
        { x: 3000, y: 5700 },
        { x: 688, y: 8551 },
        { x: 4531, y: 8847 },
        { x: 4325, y: 6666 },
        { x: 417, y: 5811 },
        { x: 884, y: 3360 },
        { x: 815, y: 2040 },
        { x: 4508, y: 2485 },
        { x: 5320, y: 4623 },
    ]
        .map((vec) => Vector.create(vec.x, vec.y + 300))
        .map(
            (vector) => (
                new Fishy(engine, vector),
                new Fishy(engine, vector),
                new Station(vector, engine, bell, () => {
                    soundPlayer.playSfx("vroot-vroot", false, true, 0.3);
                    soundPlayer.stopSfx("bubbles_ambient");
                    holeManager.reset(false);
                    bellControls.reset();
                    particleSystems.forEach((ps) => {
                        ps.stop();
                    });

                    const numSystems = particleSystems.length;

                    window.setTimeout(() => {
                        for (let i = 0; i < numSystems; ++i) {
                            particleSystems[i]?.clear();
                        }
                        particleSystems.splice(0, numSystems);
                    }, 2000);
                })
            )
        );
    new Fishy(engine, Vector.create(3294, 9067)); // player fish

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    new ThreeCanvas("three-canvas", canvas);
    soundPlayer.playAmbient("level_music", true);
});
</script>

<template>
    <div class="wrapper">
        <canvas id="matter-canvas"></canvas>
        <canvas id="three-canvas"></canvas>
        <div class="health-bar">
            <HealthBar :health="healthBar.health.value" />
        </div>
        <SubMarie v-if="showSubMarieStartMessage" :emotion="1" />
        <WonRepresentation
            v-else-if="winCon.shouldOfferRetry.value"
            :winCon="winCon"
            :holeManager="holeManager"
        ></WonRepresentation>
    </div>
    <!-- <Debug :health-bar-handler="healthBar" /> -->
</template>

<style>
.wrapper {
    width: fit-content;
    height: 100vh;
    position: relative;
}

#matter-canvas,
#three-canvas {
    position: relative;
    height: 100vh !important;
    object-fit: contain;
}

#three-canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;

    width: unset !important;
}

.health-bar {
    position: absolute;
    bottom: 20px;
    width: 80%;
    left: 50%;
    transform: translateX(-50%) scale(1.2);
}
</style>
