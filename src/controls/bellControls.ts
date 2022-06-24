import Matter, { Body } from "matter-js";

export class BellControls {
    constructor(readonly bell: Body) {}

    addForce(xForce: number, yForce: number) {
        Body.applyForce(this.bell, this.bell.position, Matter.Vector.create(xForce, yForce) )
    }
}