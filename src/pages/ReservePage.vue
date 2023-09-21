<template>
  <div>預約管理的頁面</div>
</template>

<script setup lang="ts">
import { useRoomReserveStore } from '@/stores';
const list = useRoomReserveStore().getReservations();
console.log(list);
</script>

<style scoped lang="postcss"></style>
