import { Vector, Body, Bodies, Composite, Engine, Events } from "matter-js";
import StationAsset from "../assets/hole.png";
import { HoleManager } from "./HoleManager";

export class Station {
    constructor(position: Vector, engine: Engine, bellBody: Body, onCollisionCallback: () => void) {
        const width = 100,
            height = 50;
        const body = Bodies.rectangle(position.x, position.y, width, height, {
            inertia: Infinity,
            inverseInertia: 0,
            isSensor: true,
            render: {
                sprite: {
                    texture: StationAsset,
                    xScale: 1,
                    yScale: 1,
                },
            },
        });

        Composite.add(engine.world, body);

        Events.on(engine, "collisionStart", (event) => {
            for (const pair of event.pairs) {
                const bodyA = pair.bodyA;
                const bodyB = pair.bodyB;
                if ((bodyA === body || bodyB === body) && (bodyA === bellBody || bodyB === bellBody)) {
                    onCollisionCallback();
                }
            }
        });
    }
}
