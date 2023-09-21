<template>
  <div>會議室管理的頁面</div>
</template>

<script setup lang="ts">
import { useRoomStateStore } from '@/stores';
const list = useRoomStateStore().getRoomList();
console.log(list);
</script>

<style scoped lang="postcss"></style>
