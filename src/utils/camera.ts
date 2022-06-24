import { Bodies, Body, Composite, Constraint, Engine, Events, Render } from "matter-js";

export class Camera {
    private cameraBody!: Body;

    constructor(
        center: Body,
        engine: Engine,
        private render: Render,
        private appDimensions: { width: number; height: number },
        private readonly yPos = 300
    ) {
        this.cameraBody = Bodies.rectangle(center.position.x, center.position.y, 10, 10, {
            collisionFilter: {
                group: -1,
                category: 2,
                mask: 0,
            },
            render: {
                visible: false,
            },
        });

        const constraint = Constraint.create({
            bodyA: center,
            pointA: { x: 0, y: 0 },
            bodyB: this.cameraBody,
            pointB: { x: 0, y: 0 },
            stiffness: 0.0002,
            damping: 0.06,
            render: {
                visible: false,
            },
        });

        Composite.add(engine.world, [this.cameraBody, constraint]);
        Events.on(engine, "afterUpdate", () => this.update());
    }

    private update() {
        Render.lookAt(this.render, {
            min: {
                x: this.cameraBody.position.x - this.appDimensions.width / 2,
                y: this.cameraBody.position.y - (this.appDimensions.height + this.yPos),
            },
            max: {
                x: this.cameraBody.position.x + this.appDimensions.width / 2,
                y: this.cameraBody.position.y + this.yPos,
            },
        });
    }
}
