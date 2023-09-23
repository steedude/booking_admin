<template>
  <div>預約管理的頁面</div>
</template>

<script setup lang="ts">
import { useRoomReserveStore } from '@/stores';

const { data } = await useRoomReserveStore().fetchReservations();
console.log(data);
</script>

<style scoped lang="postcss"></style>
