import { Render, Events, Mouse, Body, Vector } from "matter-js";

export class MouseInput {
    constructor(private mouse: Mouse, private bell: Body, private render: Render) {
        // this.renderMouseLine();
    }

    private renderMouseLine() {
        Events.on(this.render, "afterRender", (e) => {
            var context = this.render.context,
                endPoint = this.mouse.position;
            // @ts-ignore
            Render.startViewTransform(render);
            context.beginPath();
            context.moveTo(this.bell.position.x, this.bell.position.y);
            context.lineTo(endPoint.x, endPoint.y);
            context.strokeStyle = "#fff";
            context.lineWidth = 5;
            context.stroke();
            // @ts-ignore
            Render.endViewTransform(render);
        });
    }

    public getVector(): Vector {
        return Vector.create(
            this.bell.position.x - this.mouse.position.x,
            this.bell.position.y - this.mouse.position.y
        );
    }
}
