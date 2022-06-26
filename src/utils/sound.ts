import { Howl, Howler } from "howler";
import { Common } from "matter-js";

export type Sound =
    | "level_music"
    | "win"
    | "game_over"
    | "little_oxygen"
    | "hit_fast"
    | "hit_slow"
    | "open_hole"
    | "sonar"
    | "bubble_1"
    | "bubble_2"
    | "bubble_3"
    | "bubble_4"
    | "bubble_5"
    | "bubbles_ambient";

export class SoundPlayer {
    private ambientSound: Howl | null = null;
    private sfx: { [key: string]: Howl } = {};

    constructor() {}

    playAmbient(sound: Sound, loop = true, volume = 0.2) {
        this.ambientSound?.stop();

        this.ambientSound = new Howl({
            src: [`../sounds/${sound}.mp3`],
            autoplay: true,
            loop,
            volume,
        });
    }

    stopAmbient() {
        this.ambientSound?.stop();
    }

    playSfx(sound: Sound, loop = false, reset = true, volume = 0.8) {
        console.log("Play: " + sound);
        if (!reset && this.sfx[sound]?.playing()) return;

        const howl =
            this.sfx[sound] ??
            new Howl({
                src: [`../sounds/${sound}.mp3`],
                loop,
                volume,
            });

        howl.stop();
        howl.play();

        this.sfx[sound] = howl;
    }

    stopSfx(sound: Sound) {
        this.sfx[sound]?.stop();
    }

    stopAllSfx() {
        Object.values(this.sfx).forEach((sound) => sound.stop());
    }

    playSfxAsync(sound: Sound, volume = 0.5) {
        new Howl({
            src: [`../sounds/${sound}.mp3`],
            autoplay: true,
            volume,
        });
    }
}
