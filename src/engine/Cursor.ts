import { Body, Bodies, Mouse, Render, Engine, Composite, Events, Vector } from "matter-js";
import CursorAsset from "../assets/cursor.png";
import { MouseInput } from "../controls/mouseInput";

export class Cursor {
    constructor(mouse: MouseInput, bell: Body, render: Render, engine: Engine) {
        const cursor = Bodies.circle(0, 0, 1, {
            inertia: Infinity,
            inverseInertia: 0,
            collisionFilter: {
                category: 0,
                mask: 0,
            },
            render: {
                sprite: {
                    texture: CursorAsset,
                    yScale: 1,
                    xScale: 1,
                },
            },
        });

        Composite.add(engine.world, cursor);

        Events.on(render, "beforeRender", () => {
            cursor.render.visible = mouse.cursorVisible;
            const cursorDirection = Vector.neg(mouse.getVector());
            const cursorPosition = Vector.add(bell.position, Vector.mult(cursorDirection, 78));
            Body.setPosition(cursor, cursorPosition);
        });
    }
}
