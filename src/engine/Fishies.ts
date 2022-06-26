import { Bodies, Body, Common, Composite, Engine, Events, Vector } from "matter-js";
import Fish1 from "../assets/fish01.png";
import Fish1_Flipped from "../assets/fish01_flipped.png";

export interface FishBody extends Body {
    fishForce: Vector;
}

export class Fishy {
    constructor(engine: Engine, pos: Vector) {
        const size = Math.round(Common.random(25, 50));
        const fish = Bodies.rectangle(pos.x, pos.y, size, size, {
            collisionFilter: {
                group: -1,
                category: 4,
                mask: 2,
            },
            render: {
                sprite: {
                    texture: Fish1,
                    xScale: 0.2 * (size / 50),
                    yScale: 0.2 * (size / 50),
                },
            },
            inertia: Infinity,
            inverseInertia: 0,
            label: "fish",
        });

        (fish as FishBody).fishForce = Fishy.getNewFishForce();

        Composite.add(engine.world, fish);

        let lastVelocity = 0;
        Events.on(engine, "afterUpdate", (e) => {
            const forceVector = (fish as FishBody).fishForce;
            Body.applyForce(fish, fish.position, forceVector);
            if (
                lastVelocity !== fish.velocity.x &&
                fish.render.sprite?.texture &&
                Math.abs(fish.velocity.x) >= 0.00001
            ) {
                lastVelocity = fish.velocity.x;
                fish.render.sprite.texture = fish.velocity.x < 0 ? Fish1_Flipped : Fish1;
            }
        });
    }

    static getNewFishForce() {
        const xDir = Common.random(0, 1) > 0.5;
        const yDir = Common.random(0, 1) > 0.5;
        const xForce = Common.random(1, 3);
        const yForce = Common.random(1, 3);
        return Vector.create((xForce / 100000) * (xDir ? 1 : -1), (yForce / 100000) * (yDir ? 1 : -1));
    }
}
