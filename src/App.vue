<script setup lang="ts">
import Core from "./components/Core.vue";
</script>

<template>
    <div class="app-wrapper">
        <Core />
    </div>
</template>

<style>
body {
    margin: 0px;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.app-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #14151f;
}
</style>
