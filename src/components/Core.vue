<script setup lang="ts">
import Matter, { Common } from "matter-js";
import { onMounted } from "vue";
import * as PolyDecomp from "poly-decomp";
import { BellControls } from "../controls/bellControls";
import { UserInputHandler } from "../controls/userInput";

// module aliases
const Engine = Matter.Engine,
  Render = Matter.Render,
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

const bell = Bodies.circle(center.x, appDimensions.height - 60, 60, {
  frictionAir: 0.03,
  inertia: Infinity,
  inverseInertia: 0,
});

const bellControls = new BellControls(bell, engine);
const userInputHandler = new UserInputHandler(document.body, bell);

userInputHandler.registerCallback((input) => bellControls.addForce(input));

onMounted(() => {
  //convert SVGs to Bodies
  const bodies = Array.from(
    document.querySelectorAll<SVGPathElement>("svg > path")
  ).map((path) => {
    return Matter.Bodies.fromVertices(
      center.x,
      center.y,
      [Matter.Svg.pathToVertices(path, 15)],
      {},
      true
    );
  });

  // create a renderer
  const render = Render.create({
    element: document.querySelector<HTMLElement>("#core")!,
    engine: engine,

    options: {
      showAxes: true,
      showIds: true,
      showCollisions: true,
      showPerformance: true,
      showInternalEdges: true,
      ...appDimensions,
    },
  });

  // create ground + left and right mock terrain
  const boxA = Bodies.rectangle(
    0,
    appDimensions.height,
    80,
    appDimensions.height,
    { isStatic: true }
  );
  const boxB = Bodies.rectangle(
    appDimensions.width,
    appDimensions.height,
    80,
    appDimensions.height,
    { isStatic: true }
  );
  const ground = Bodies.rectangle(
    appDimensions.width / 2,
    appDimensions.height,
    appDimensions.width,
    60,
    { isStatic: true }
  );

  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, boxB, ground, bell, ...bodies]);

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

<style scoped />
