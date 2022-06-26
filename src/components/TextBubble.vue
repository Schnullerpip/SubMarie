<template>
    <div class="text-bubble">
        <slot />
    </div>
</template>

<style scoped>
.text-bubble {
    background: white;
    border: 2px solid gold;
    border-radius: 10px;

    padding: 5px;

    color: black;
    text-shadow: 0 1px 2px grey;
}
</style>
