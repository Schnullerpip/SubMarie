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
            if (normalized.x === 0 && normalized.y === 0) return;
            this.notify(normalized);
        });

        const handleClick = () => {
            setTimeout(() => {
                if (!this.mouseInput) return;
                this.notify(this.mouseInput.getVector());
            }, 0);
        };

        root.addEventListener("click", (event: Event) => handleClick());
        root.addEventListener("touchend", (event: Event) => handleClick());
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
