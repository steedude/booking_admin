<template>
  <!-- 會議室管理中的會議室列表表格 -->
  <el-form
    :inline="true"
    :model="formData"
    class="demo-form-inline"
  >
    <el-form-item>
      <el-date-picker
        v-model="formData.start_time"
        class="pr-2"
        type="date"
        placeholder="開始時間"
        clearable
      />
      <el-date-picker
        v-model="formData.end_time"
        type="date"
        placeholder="結束時間"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="formData.seats"
        placeholder="座位數量"
        clearable
      >
        <el-option
          label="全部"
          value="0"
        />
        <el-option
          v-for="(it, index) in totalSeats"
          :key="index"
          :label="it"
          :value="it"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="formData.product_id"
        placeholder="會議室過濾"
        multiple
        collapse-tags
        clearable
      >
        <el-option
          v-for="(prodcut, index) in productList"
          :key="index"
          :label="prodcut.name"
          :value="prodcut._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="store.getReservationsList(searchState)"
        >Query</el-button
      >
      <el-button
        type="primary"
        @click="store.filterReservationDay(-1)"
        >昨日</el-button
      >
      <el-button
        type="primary"
        @click="store.filterReservationDay(0)"
        >今日</el-button
      >
      <el-button
        type="primary"
        @click="store.filterReservationDay(-7)"
        >一週</el-button
      >
      <el-button
        type="primary"
        @click="store.filterReservationDay(-30)"
        >一月</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useReservationStore } from '@/stores';
const store = useReservationStore();

const { searchState, productList, totalSeats } = storeToRefs(store);

const formData: any = ref(searchState.value);
</script>

<style scoped lang="postcss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
