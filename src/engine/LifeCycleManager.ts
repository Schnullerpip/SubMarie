import { Engine, Events } from "matter-js";

export class LifeCycleManager {
    constructor(engine: Engine) {
        Events.on(engine, "afterUpdate", () => {});
    }
}
