<script lang="ts" setup>
import MockAsset from "../assets/SubMarine.png";
import { computed } from "vue";
import TextBubble from "./TextBubble.vue";

enum SubMarieEmotion {
    win,
    start,
}
const { emotion } = defineProps<{
    emotion: SubMarieEmotion;
}>();

const imgSrc = computed(() => MockAsset);

const text = computed(() => {
    switch (emotion) {
        case SubMarieEmotion.win:
            return "Yay, we did it! :D";
        default:
            return "I hate fish!!!!!!";
    }
});

//TODO get an asset by the emotion
</script>

<template>
    <transition name="appear-from-right" appear>
        <div class="img-and-text">
            <img :src="imgSrc" />
            <TextBubble>{{ text }}</TextBubble>
        </div>
    </transition>
</template>

<style scoped>
.img-and-text {
    position: absolute;
    right: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

img {
    width: 30%;
    height: 50%;
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
