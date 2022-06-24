import { Body, Engine, Events, Vector } from "matter-js";

const drag = 0.1

export class BellControls {

    private accumulatedForce = Vector.create(0, 0)

    constructor(readonly bell: Body, readonly engine: Engine) {

       Events.on(engine, "afterUpdate", (event) => {
           const deltaTime = event.source.timing.lastDelta
           this.update(deltaTime)
       })

    }

    addForce(force: Matter.Vector) {
        this.accumulatedForce = Vector.add(this.accumulatedForce, force)
    }

    private update(deltaTime: number) {
        Body.applyForce(this.bell, this.bell.position, Vector.mult(this.accumulatedForce, deltaTime / 1000 * drag)  )
    }
}