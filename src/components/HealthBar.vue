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
        <div class="bar-fill" :style="{ transform: `scaleX(${health * 100}%)` }"></div>
    </div>
</template>

<style scoped>
.bar-wrapper {
    width: 500px;
    height: 30px;
    border-radius: 30px;
    border: 2px darkslategray solid;
    background-color: white;
    position: relative;
    overflow: hidden;
}

.bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: transform 50ms linear;
    background-color: aquamarine;
    transform-origin: center left;
}
</style>
