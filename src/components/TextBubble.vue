<template>
    <div class="text-bubble">
        <slot />
    </div>
</template>

<style scoped>
.text-bubble {
    background: white;
    border: 3px solid #5ec8fa;
    border-radius: 10px;

    padding: 24px 5px 15px;

    color: black;
    text-shadow: 0 1px 2px grey;
}
</style>
