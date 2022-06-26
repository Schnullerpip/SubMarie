import { computed } from "@vue/reactivity";
import { Engine, Events } from "matter-js";
import { ref } from "vue";
import { BellControls } from "./bellControls";

const breathingDepletionFactor = 0.01;

export class HealthBarHandler {
    private readonly maxHealth = 100;
    private currentHealth = ref(this.maxHealth);
    public health = computed(() => this.currentHealth.value / this.maxHealth);

    private listeners: (() => void)[] = [];

    private breathingDepletion = breathingDepletionFactor;

    constructor(bellControls: BellControls, engine: Engine) {
        Events.on(engine, "afterUpdate", (e) => {
            this.currentHealth.value -= bellControls.forces.length * 0.0025;
            this.currentHealth.value -= this.breathingDepletion;

            if (this.currentHealth.value <= 0) {
                this.currentHealth.value = 0;
                this.listeners.forEach((callBack) => callBack());
            }
        });
    }

    stopBreathing() {
        this.breathingDepletion = 0;
    }

    reset() {
        this.currentHealth.value = this.maxHealth;
        this.breathingDepletion = breathingDepletionFactor;
    }

    register(callBack: () => void) {
        this.listeners.push(callBack);
    }
}
