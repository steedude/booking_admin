<template>
  <div>會議室管理的頁面</div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { getRoomListApi } from '@/apis/manage';

async function getRoomList() {
  const list = await getRoomListApi();
  console.log(list);
}

onUnmounted(getRoomList);
</script>

<style scoped lang="postcss"></style>
