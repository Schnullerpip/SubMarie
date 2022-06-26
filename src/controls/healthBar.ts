import { computed } from "@vue/reactivity";
import { Engine, Events } from "matter-js";
import { ref } from "vue";
import { SoundPlayer } from "../utils/sound";
import { BellControls } from "./bellControls";

export class HealthBarHandler {
    private readonly maxHealth = 1_000_000;
    public currentHealth = ref(this.maxHealth);
    public health = computed(() => this.currentHealth.value / this.maxHealth);

    public breathDepletion = ref(20);
    public holeDepletion = ref(40);

    private running = true;
    private almostDeadSoundPlaying = false;

    private listeners: (() => void)[] = [];

    constructor(bellControls: BellControls, engine: Engine, soundPlayer: SoundPlayer) {
        Events.on(engine, "afterUpdate", (e) => {
            if (!this.running) {
                return;
            }
            this.currentHealth.value -= this.breathDepletion.value;
            this.currentHealth.value -= bellControls.forces.length * this.holeDepletion.value;

            if (this.health.value <= 0.25 && !this.almostDeadSoundPlaying) {
                this.almostDeadSoundPlaying = true;
                soundPlayer.playAmbient("little_oxygen", true, 0.6);
            }

            if (this.currentHealth.value <= 0) {
                this.currentHealth.value = 0;
                this.running = false;
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
        this.almostDeadSoundPlaying = false;
    }

    register(callBack: () => void) {
        this.listeners.push(callBack);
    }
}
