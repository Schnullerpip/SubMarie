<script setup lang="ts">
import { HealthBarHandler } from "../controls/healthBar";

const { healthBarHandler } = defineProps({
    healthBarHandler: {
        type: HealthBarHandler,
        required: true,
    },
});
</script>

<template>
    <div class="debug-container" @click.stop @keydown.stop>
        <p>Health</p>
        <input v-model="healthBarHandler.currentHealth.value" type="number" readonly />
        <p>Breath Depletion</p>
        <input v-model="healthBarHandler.breathDepletion.value" type="number" />
        <p>Hole Depletion</p>
        <input v-model="healthBarHandler.holeDepletion.value" type="number" />
    </div>
</template>

<style scoped>
.debug-container {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 10px;
    background-color: rgba(256, 256, 256, 0.1);
}

p {
    color: white;
    margin: 0px;
}
</style>
