<template>
  <LoginButton />
</template>

<script setup lang="ts">
import LoginButton from '@/components/loginPage/LoginButton.vue';
</script>

<style lang="postcss" scoped>
.logo {
  @apply w-24 h-24 p-6 mx-auto will-change-[filter] transition-[filter]
  duration-300 hover:drop-shadow-[0_0_2em_#646cffaa];
}
</style>
