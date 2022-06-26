<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { WinCon } from "../engine/WinCon";
import SubMarie from "./SubMarie.vue";
import TextBubble from "./TextBubble.vue";

const { winCon } = defineProps<{
    winCon: WinCon;
}>();

let showRetryButton = ref(false);

onMounted(() => {
    window.setTimeout(() => (showRetryButton.value = true), 2000);
});

const userClickedRetry = () => {
    winCon.playAgain();
};
</script>

<template>
    <div v-if="winCon.shouldOfferRetry.value" class="won-representation">
        <SubMarie :emotion="0" />
        <button v-if="showRetryButton" @click.native="userClickedRetry">Play again! (sry Marie ¯\_(ツ)_/¯)</button>
    </div>
</template>

<style scoped>
* {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
}
.won-representation {
    position: absolute;
    width: 100vw;
    height: 100vh;
}

button {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);

    width: 150px;
    height: 100px;

    border-radius: 10px;
}

.marie-and-text {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.text-bubble {
}
</style>
