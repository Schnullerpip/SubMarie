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

        <div v-if="showRetryButton" class="play-again-button" @click.native.stop="userClickedRetry">
            <div class="button-line"></div>
            <div class="button"></div>
            <div class="button-line"></div>
        </div>
    </div>
</template>

<style scoped>
.won-representation {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.play-again-button {
    position: absolute;
    left: 0;
    bottom: 105px;
    width: 100%;
    display: flex;
    align-items: center;
}

.button {
    height: 65.5px;
    width: 173px;
    background: url("../assets/buttons/button.png") no-repeat;
    background-size: contain;
}

.button-line {
    flex: 1;
    height: 10px;
    background: url("../assets/buttons/button-bar.png") repeat-x;
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
</style>
