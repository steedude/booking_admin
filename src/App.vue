<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <BreadcrumbBar />
    <SearchBar />
    <router-view />
    <PaginationBar />
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/indexItems/SideBar.vue';
import BreadcrumbBar from '@/components/indexItems/BreadcrumbBar.vue';
import SearchBar from '@/components/indexItems/SearchBar.vue';
import PaginationBar from '@/components/indexItems/PaginationBar.vue';
</script>

<style scoped></style>
