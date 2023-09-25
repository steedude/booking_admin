<template>
  <div>預約管理的頁面</div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { getReservationsApi } from '@/apis/reserve';

async function getReservations() {
  const list = await getReservationsApi();
  console.log(list);
}

onUnmounted(getReservations);
</script>

<style scoped lang="postcss"></style>
