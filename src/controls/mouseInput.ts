import { Render, Events, Mouse, Body } from "matter-js";

export class MouseInput {
    constructor(mouse: Mouse, bell: Body, render: Render) {
        Events.on(render, "afterRender", (e) => {
            var context = render.context,
                endPoint = mouse.position;

            // @ts-ignore
            Render.startViewTransform(render);

            context.beginPath();
            context.moveTo(bell.position.x, bell.position.y);
            context.lineTo(endPoint.x, endPoint.y);
            context.strokeStyle = "#fff";
            context.lineWidth = 5;
            context.stroke();

            // @ts-ignore
            Render.endViewTransform(render);
        });
    }
}
