import { computed } from "@vue/reactivity";
import { Engine, Events } from "matter-js";
import { ref } from "vue";
import { BellControls } from "./bellControls";

export class HealthBarHandler {
    private readonly maxHealth = 100;
    private currentHealth = ref(this.maxHealth);
    public health = computed(() => this.currentHealth.value / this.maxHealth);

    constructor(bellControls: BellControls, engine: Engine) {
        Events.on(engine, "afterUpdate", (e) => {
            this.currentHealth.value -= bellControls.forces.length * 0.001;
            this.currentHealth.value -= 0.01;
        });
    }
}
