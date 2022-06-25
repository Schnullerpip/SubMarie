import Matter, { Bodies, Body, Composite, Engine, Events, Vector } from "matter-js";
import { ObjectPool } from "./ObjectPool";
import HoleAsset from "../assets/hole.png";

type PositionedHole = {
    offsetFromBellOrigin: Vector;
    body: Matter.Body;
};

const bellHoleCreator = (direction: Vector) => {
    const reverseForceInput = Vector.mult(direction, -1);
    const offset = Vector.mult(reverseForceInput, 72);
    const rotationAngle = Math.atan2(reverseForceInput.y, reverseForceInput.x);
    const hole = Bodies.circle(-1000, -1000, 1, {
        inertia: Infinity,
        inverseInertia: 0,
        collisionFilter: {
            group: -1,
            category: 0,
            mask: 0,
        },
        render: {
            sprite: {
                texture: HoleAsset,
                xScale: 0.4,
                yScale: 0.4,
            },
        },
    });
    Body.rotate(hole, rotationAngle);

    return {
        offsetFromBellOrigin: offset,
        body: hole,
    };
};
const holeObjectPool = new ObjectPool(bellHoleCreator, 30);

export class HoleManager {
    private holes!: Set<PositionedHole>;
    constructor(private readonly parent: Body, private readonly engine: Engine) {
        this.reset();
        Events.on(engine, "beforeUpdate", (event) => {
            //const deltaTime = event.source.timing.lastDelta;
            this.holes.forEach((hole) => {
                const parentPosition = this.parent.position;
                const offsettedPosition = Vector.add(parentPosition, hole.offsetFromBellOrigin);
                Body.setPosition(hole.body, offsettedPosition);
            });
        });
    }

    createHole(direction: Vector) {
        const hole = bellHoleCreator(direction);
        this.holes.add(hole);
        Composite.add(this.engine.world, hole.body);
    }

    reset() {
        this.holes?.forEach((hole) => Composite.remove(this.engine.world, hole.body));
        this.holes = new Set<PositionedHole>();
    }
}
