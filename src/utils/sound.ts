import { Howl, Howler } from "howler";

export class SoundPlayer {
    private player: any;

    constructor() {
        this.player = new Howl({
            src: ["../sounds/bubbles.mp3"],
        });
    }

    play() {
        this.player.play();
    }
}
