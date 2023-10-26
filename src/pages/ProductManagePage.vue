<template>
  <div>會議室管理的頁面</div>

  <div class="p-4">
    <ElButton
      type="primary"
      @click="onCreate"
      >新增會議室</ElButton
    >
    <RoomModal ref="roomModel" />
    <RoomTable
      :data="products"
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores';
import { Product } from '@/types/product';
import { ElMessageBox } from 'element-plus';
import RoomModal from '@/components/managePage/RoomModal.vue';
import RoomTable from '@/components/managePage/RoomTable.vue';

const store = useProductStore();
const { products } = storeToRefs(store);
const roomModel = ref<InstanceType<typeof RoomModal>>();

function onCreate() {
  roomModel.value?.setDialogVisible(true);
}

function onEdit(product: Product) {
  roomModel.value?.setDialogVisible(false, {
    form: product,
  });
}

function onDelete(productId: string) {
  ElMessageBox.confirm('確定是否刪除會議室?')
    .then(() => {
      store.deleteProduct(productId);
    })
    .catch(() => {
      console.log('cancel');
    });
}

onMounted(async () => {
  await store.getProductList();
});
</script>

<style scoped lang="postcss"></style>
