<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <BreadcrumbBar />
    <router-view />
    <PaginationBar />
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/common/SideBar.vue';
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
</script>

<style scoped></style>
