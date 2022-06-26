import { computed } from "@vue/reactivity";
import { Engine, Events } from "matter-js";
import { ref } from "vue";
import { BellControls } from "./bellControls";

export class HealthBarHandler {
    private readonly maxHealth = 1_000_000;
    public currentHealth = ref(this.maxHealth);
    public health = computed(() => this.currentHealth.value / this.maxHealth);

    public breathDepletion = ref(100);
    public holeDepletion = ref(35);

    private running = true;

    private listeners: (() => void)[] = [];

    constructor(bellControls: BellControls, engine: Engine) {
        Events.on(engine, "afterUpdate", (e) => {
            if (!this.running) {
                return;
            }
            this.currentHealth.value -= this.breathDepletion.value;
            this.currentHealth.value -= bellControls.forces.length * this.holeDepletion.value;

            if (this.currentHealth.value <= 0) {
                this.currentHealth.value = 0;
                this.listeners.forEach((callBack) => callBack());
            }
        });
    }

    stopBreathing() {
        this.running = false;
    }

    reset() {
        this.currentHealth.value = this.maxHealth;
        this.running = true;
    }

    register(callBack: () => void) {
        this.listeners.push(callBack);
    }
}
