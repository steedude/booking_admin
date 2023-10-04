<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <div class="h-full w-full">
      <div class="p-4 flex justify-between">
        <BreadcrumbBar />
        <div
          class="mr-4"
          @click="onClickLogout"
        >
          登出
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/common/SideBar.vue';
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue';
import { useUserStore } from '@/stores';
import router from '@/router';
const { logoutUser } = useUserStore();

async function onClickLogout() {
  try {
    await logoutUser();
    await router.push('/auth');
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="postcss"></style>
