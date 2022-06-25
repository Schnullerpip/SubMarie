import { Body, Engine, Events, Vector } from "matter-js";

const drag = 0.25;

export class BellControls {
    private accumulatedForce!: Vector;
    public forces!: Vector[];

    constructor(readonly bell: Body, readonly engine: Engine) {
        this.reset();
        Events.on(engine, "afterUpdate", (event) => {
            const deltaTime = event.source.timing.lastDelta;
            this.update(deltaTime);
        });
    }

    addForce(force: Matter.Vector) {
        this.forces.push(force);
        this.accumulatedForce = Vector.add(this.accumulatedForce, force);
    }

    reset() {
        this.accumulatedForce = Vector.create(0, 0);
        this.forces = [];
    }

    private update(deltaTime: number) {
        Body.applyForce(this.bell, this.bell.position, Vector.mult(this.accumulatedForce, (deltaTime / 1000) * drag));
    }
}
