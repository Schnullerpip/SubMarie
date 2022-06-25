import { Body, Bodies, Mouse, Render, Engine, Composite, Events, Vector } from "matter-js";
import CursorAsset from "../assets/cursor.png";

export class Cursor {
    constructor(mouse: Mouse, bell: Body, render: Render, engine: Engine) {
        const cursor = Bodies.circle(0, 0, 1, {
            inertia: Infinity,
            inverseInertia: 0,
            collisionFilter: {
                group: -1,
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
            const mousePosition = mouse.position;
            const directionFromBellToMouse = Vector.sub(mousePosition, bell.position);
            const directionNormalized = Vector.normalise(directionFromBellToMouse);
            const cursorPosition = Vector.add(bell.position, Vector.mult(directionNormalized, 72));
            Body.setPosition(cursor, cursorPosition);
        });
    }
}
