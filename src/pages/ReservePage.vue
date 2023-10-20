<template>
  <div class="p-4">
    <div>預約管理的頁面</div>
    <ElButton
      type="primary"
      @click="onCreate"
      >新增預約</ElButton
    >
    <ReserveSearch :data="searchState" />
    <ReserveTable
      :data="reservations"
      @cancel="onCancel"
      @approve="onApprove"
    />
    <el-pagination
      v-model:current-page="searchState.page"
      v-model:page-size="searchState.page_size"
      background
      class="flex justify-center"
      layout="total, sizes, prev, pager, next"
      :page-sizes="[1, 2, 3, 4, 10]"
      :total="totalSize"
      @size-change="onSizeChange"
      @current-change="store.getReservationsList(searchState)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useReservationStore } from '@/stores';
import ReserveTable from '@/components/reservePage/ReserveTable.vue';

import { Reservation } from '@/types/reservation';
import { ElMessageBox } from 'element-plus';
import ReserveSearch from '@/components/reservePage/ReserveSearch.vue';

const store = useReservationStore();
const { reservations, searchState, totalSize } = storeToRefs(store);

function onCancel({ _id: id }: Reservation) {
  ElMessageBox.confirm('是否確認要取消預定?')
    .then(() => {
      store.cancelReservation(id);
    })
    .catch(() => {
      console.log('cancel');
    });
}
function onApprove({ _id: id }: Reservation) {
  store.approveReservation(id);
}

function onCreate() {
  console.log('create');
}

function onSizeChange() {
  console.log('handleSizeChange');
  searchState.value.page = 1;
  store.getReservationsList(searchState.value);
}

onMounted(async () => {
  await store.getReservationsList();
  console.log('mounted', searchState.value);
  console.log('mounted2', reservations);
});
</script>

<style scoped lang="postcss"></style>
