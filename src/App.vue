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

* {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    overflow: hidden;
}

.app-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #14151f;
    overflow: hidden;
}
</style>
