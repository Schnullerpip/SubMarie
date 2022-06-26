import { Body, Engine, Events, Vector } from "matter-js";
import { SoundPlayer } from "../utils/sound";

const drag = 0.25;

export class BellControls {
    private accumulatedForce!: Vector;
    public forces!: Vector[];

    constructor(readonly bell: Body, readonly engine: Engine, private readonly soundPlayer: SoundPlayer) {
        this.reset();
        Events.on(engine, "afterUpdate", (event) => {
            const deltaTime = event.source.timing.lastDelta;
            this.update(deltaTime);
        });
    }

    addForce(force: Matter.Vector) {
        this.forces.push(force);
        this.accumulatedForce = Vector.add(this.accumulatedForce, force);
        this.soundPlayer.playSfx("open_hole", false, true, 0.4);
        if (this.forces.length === 1) {
            this.soundPlayer.playSfx("bubbles_ambient", true, true, 0.4);
        }
    }

    reset() {
        this.accumulatedForce = Vector.create(0, 0);
        this.forces = [];
    }

    private update(deltaTime: number) {
        Body.applyForce(this.bell, this.bell.position, Vector.mult(this.accumulatedForce, (deltaTime / 1000) * drag));
    }
}
