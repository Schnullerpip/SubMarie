import { Vector, Body, Bodies, Composite, Engine, Events } from "matter-js";
import StationAsset from "../assets/repair-robo.png";
import { HoleManager } from "./HoleManager";

export class Station {
    constructor(position: Vector, engine: Engine, bellBody: Body, onCollisionCallback: () => void) {
        const width = 180,
            height = 120;
        const body = Bodies.rectangle(position.x, position.y, width, height, {
            inertia: Infinity,
            inverseInertia: 0,
            isSensor: true,
            frictionAir: 0.0035,
            render: {
                sprite: {
                    texture: StationAsset,
                    xScale: 0.4,
                    yScale: 0.4,
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

        let tick = 0;
        let yForceDir = 1;
        let xForceDir = 1;
        Events.on(engine, "afterUpdate", (event) => {
            tick += 0.5;
            if (tick % 100 < 10 && tick % 100 !== 0) {
                Body.applyForce(body, body.position, Vector.create(0, 0.004 * (tick % 100) * yForceDir));
                yForceDir *= -1;
            }
            // if (tick % 144 < 10 && tick % 144 !== 0) {
            //     Body.applyForce(body, body.position, Vector.create(0.002 * (tick % 144) * xForceDir, 0));
            //     xForceDir *= -1;
            // }
            if (tick > 1000) {
                tick -= 1000;
            }
        });
    }
}
