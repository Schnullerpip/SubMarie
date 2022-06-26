import { Body, Engine, Events } from "matter-js";
import { ref } from "vue";

//TODO set on so... when the background is ready
const winHeight = 100;

export class WinCon {
    shouldOfferRetry = ref(false);

    constructor(bell: Body, engine: Engine, onWon: () => Promise<void>, private readonly onPlayAgain: () => void) {
        Events.on(engine, "afterUpdate", async () => {
            if (bell.position.y <= winHeight && !this.shouldOfferRetry.value) {
                await onWon();
                this.shouldOfferRetry.value = true;
            }
        });
    }

    playAgain() {
        this.shouldOfferRetry.value = false;
        this.onPlayAgain();
    }
}
