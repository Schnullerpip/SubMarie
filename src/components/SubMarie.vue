<script lang="ts" setup>
import SubMarie from "../assets/SubMarie.png";
import HappySubMarie from "../assets/HappySubMarie.png";
import { computed } from "vue";
import TextBubble from "./TextBubble.vue";

enum SubMarieEmotion {
    win,
    start,
}
const { emotion } = defineProps<{
    emotion: SubMarieEmotion;
}>();

const imgSrc = computed(() => (emotion === SubMarieEmotion.start ? SubMarie : HappySubMarie));

const text = computed(() => {
    switch (emotion) {
        case SubMarieEmotion.win:
            return "Yay, we did it! :D Fresh air I missed you... actually smells fishy >.<";
        default:
            return "Oh no! My base station's life-support systems have shut down and all I have is this faulty diving bell! I will have to punch some holes into it in order to create uplift, but careful - I only have so much oxygen D:";
    }
});

//TODO get an asset by the emotion
</script>

<template>
    <transition name="appear-from-right" appear>
        <div class="img-and-text">
            <img :src="imgSrc" />
            <TextBubble class="text-bubble">{{ text }}</TextBubble>
        </div>
    </transition>
</template>

<style scoped>
.img-and-text {
    position: absolute;
    right: 10px;
    top: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}

.text-bubble {
    max-width: 300px;
    margin-top: -26px;
    position: relative;
}

img {
    width: min(25vw, 200px);
    height: min(25vw, 200px);
    position: relative;
    z-index: 2;
}

.appear-from-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.appear-from-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.appear-from-right-enter-active,
.appear-from-right-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
}
</style>
