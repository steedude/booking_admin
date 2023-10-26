<template>
  <!-- 左邊的選擇Bar -->
  <el-menu
    default-active="1"
    router
  >
    <el-menu-item
      index="1"
      :route="{ name: 'reserveManage' }"
    >
      <el-icon><setting /></el-icon>
      <span>預約管理</span>
    </el-menu-item>

    <el-menu-item
      index="2"
      :route="{ name: 'productManage' }"
    >
      <el-icon><document /></el-icon>
      <span>會議室管理</span>
    </el-menu-item>

    <el-menu-item
      index="3"
      :route="{ name: 'teamManage' }"
    >
      <el-icon><MilkTea /></el-icon>
      <span>團隊管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { Document, Setting, MilkTea } from '@element-plus/icons-vue';
</script>

<style scoped lang="postcss"></style>
