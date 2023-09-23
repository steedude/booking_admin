<template>
  <!-- 會議室管理中的會議室列表表格 -->
  <div>會議室列表表格</div>
  <tbody>
    <tr>
      <RoomRow />
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import RoomRow from './ManageRoomTable.vue';
</script>

<style scoped lang="postcss"></style>
