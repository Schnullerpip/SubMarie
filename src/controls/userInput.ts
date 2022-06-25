import Matter, { Vector } from "matter-js";
import { MouseInput } from "./mouseInput";

//normalized vector that pointsfrom the unit circles origin to its surface point
type UserInput = Matter.Vector;

type UserInputListener = (input: UserInput) => void;

export class UserInputHandler {
    private listeners: UserInputListener[] = [];
    private mouseInput: MouseInput | null = null;

    /**
     * @param referencePosition the reference to a position that the UserInputHandler can compare to a mouse/touch event
     */
    constructor(root: Element, private readonly referencePosition: { position: Matter.Vector }) {
        root.addEventListener("keydown", (event: Event) => {
            const keyEvent = event as KeyboardEvent;
            const key = keyEvent.key;

            const forces = Matter.Vector.create(0, 0);

            if (key === "w" || key === "ArrowUp") {
                forces.y += -1;
            }

            if (key === "a" || key === "ArrowLeft") {
                forces.x += -1;
            }

            if (key === "s" || key === "ArrowDown") {
                forces.y += 1;
            }

            if (key === "d" || key === "ArrowRight") {
                forces.x += 1;
            }

            const normalized = Vector.normalise(forces);
            this.notify(normalized);
        });

        root.addEventListener("click", (event: Event) => {
            if (!this.mouseInput) return;
            const vector = this.mouseInput.getVector();
            const normalized = Vector.normalise(vector);
            this.notify(normalized);
        });
    }

    registerCallback(cb: UserInputListener) {
        this.listeners.push(cb);
    }

    setMouseInput(input: MouseInput): void {
        this.mouseInput = input;
    }

    private notify(input: UserInput) {
        this.listeners.forEach((cb) => cb(input));
    }
}
