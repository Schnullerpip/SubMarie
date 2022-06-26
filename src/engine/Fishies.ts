import { Bodies, Body, Common, Composite, Engine, Events, Vector } from "matter-js";
import Fish1 from "../assets/fish01.png";
import Fish1_Flipped from "../assets/fish01_flipped.png";
import Fish2 from "../assets/fish02.png";
import Fish2_Flipped from "../assets/fish02_flipped.png";

export interface FishBody extends Body {
    fishForce: Vector;
}

const fishPool = [
    {
        width: 50,
        height: 50,
        img: Fish1,
        imgFlipped: Fish1_Flipped,
        scale: 0.5,
    },
    {
        width: 99,
        height: 55,
        img: Fish2,
        imgFlipped: Fish2_Flipped,
        scale: 0.5,
    },
];

export class Fishy {
    private fishType;

    constructor(engine: Engine, pos: Vector) {
        const size = Common.random(1, 2);
        this.fishType = fishPool[Math.round(Common.random(0, fishPool.length - 1))];
        const fish = Bodies.rectangle(pos.x, pos.y, this.fishType.width * size, this.fishType.height * size, {
            collisionFilter: {
                group: -1,
                category: 4,
                mask: 2,
            },
            render: {
                sprite: {
                    texture: this.fishType.img,
                    xScale: this.fishType.scale * size,
                    yScale: this.fishType.scale * size,
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
                fish.render.sprite.texture = fish.velocity.x < 0 ? this.fishType.imgFlipped : this.fishType.img;
            }
        });
    }

    static getNewFishForce() {
        const xDir = Common.random(0, 1) > 0.5;
        const yDir = Common.random(0, 1) > 0.5;
        const xForce = Common.random(2, 4);
        const yForce = Common.random(2, 4);
        return Vector.create((xForce / 20000) * (xDir ? 1 : -1), (yForce / 20000) * (yDir ? 1 : -1));
    }
}
