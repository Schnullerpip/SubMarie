<script setup lang="ts">
const { health } = defineProps({
    health: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div class="bar-wrapper">
        <div class="overlay">
            <div class="left"></div>
            <div class="center"></div>
            <div class="right"></div>
        </div>
        <div class="bar-fill" :style="{ transform: `scaleX(${health * 100}%)` }"></div>
        <div class="sections-wrapper">
            <div class="shine shine-1"></div>
            <div class="shine shine-2"></div>
            <div class="shine shine-3"></div>
            <template v-for="index in 8">
                <div class="sections-fill"></div>
                <div class="sections"></div>
            </template>
        </div>
        <div class="sign"></div>
    </div>
</template>

<style scoped>
.bar-wrapper {
    width: 100%;
    height: 32px;
    position: relative;
}

.bar-fill,
.sections-wrapper {
    position: absolute;
    top: 6px;
    left: 29px;
    height: 18px;
    width: calc(100% - 58px);
    display: flex;
}

.bar-fill {
    transition: transform 50ms linear;
    transform-origin: center left;
    background: url("../assets/healthbar/base.png") repeat-x;
    background-size: contain;
}

.shine {
    width: 43px;
    height: 18px;
    mix-blend-mode: soft-light;
    position: absolute;
    top: 3px;
    background: url("../assets/healthbar/glass-reflection.png") repeat-x;
    background-size: contain;
}

.shine-1 {
    left: 0%;
}
.shine-2 {
    left: 33%;
}
.shine-3 {
    left: 75%;
}

.sections-wrapper {
    top: 2px;
    height: 25px;
}

.sections-fill {
    flex: 1;
    opacity: 0;
}
.sections {
    width: 2px;
    background: linear-gradient(180deg, #3a3a3a 0%, #000000 36.13%, #000000 100%);
    box-shadow: -2px 0px 0px #000000;
}

.sections:last-child {
    opacity: 0;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
}

.left {
    flex: 0 0 76px;
    background: url("../assets/healthbar/left.png") no-repeat;
    background-size: contain;
}
.center {
    flex: 1;
    background: url("../assets/healthbar/middle.png") repeat-x;
    background-size: contain;
}
.right {
    flex: 0 0 76px;
    background: url("../assets/healthbar/right.png") no-repeat;
    background-size: contain;
}

.sign {
    position: absolute;
    width: 36px;
    height: 39px;
    top: -37px;
    left: 50%;
    transform: translateX(-50%);
    background: url("../assets/healthbar/sign.png") no-repeat;
    background-size: contain;
}
</style>
