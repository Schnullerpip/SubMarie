import { computed } from "@vue/reactivity";
import { Engine, Events } from "matter-js";
import { ref } from "vue";
import { BellControls } from "./bellControls";

export class HealthBarHandler {
    private readonly maxHealth = 100;
    private currentHealth = ref(this.maxHealth);
    public health = computed(() => this.currentHealth.value / this.maxHealth);

    private listeners: (() => void)[] = [];

    constructor(bellControls: BellControls, engine: Engine) {
        Events.on(engine, "afterUpdate", (e) => {
            this.currentHealth.value -= bellControls.forces.length * 0.001;
            this.currentHealth.value -= 0.01;

            if (this.currentHealth.value <= 0) {
                this.listeners.forEach((callBack) => callBack());
            }
        });
    }

    reset() {
        this.currentHealth.value = this.maxHealth;
    }

    register(callBack: () => void) {
        this.listeners.push(callBack);
    }
}
