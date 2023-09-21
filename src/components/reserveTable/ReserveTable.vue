<template>
  <!-- 預約管理中的預約列表表格 -->
  <div>預約列表表格</div>
  <tbody>
    <tr>
      <ReserveRow />
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import ReserveRow from './ReserveRow.vue';
</script>

<style scoped lang="postcss"></style>
