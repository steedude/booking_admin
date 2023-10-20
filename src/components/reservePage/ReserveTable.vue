<template>
  <!-- 會議室管理中的會議室列表表格 -->
  <el-table :data="props.data">
    <el-table-column
      prop="name"
      label="會議室名稱"
    >
      <template #default="scope">
        {{ scope.row.product.name }}
      </template></el-table-column
    >
    <el-table-column
      prop="start_time"
      label="開始時間"
      align="center"
    />
    <el-table-column
      prop="end_time"
      label="結束時間"
      align="center"
    />
    <el-table-column
      prop="team"
      label="組別"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="user"
      label="預約者"
      align="center"
    >
      <template #default="scope">
        {{ scope.row.user.account }}
      </template>
    </el-table-column>
    <el-table-column
      prop="comfirmed"
      label="審核狀態"
      align="center"
    >
      <template #default="scope">
        {{ scope.row.confirmed === true ? '通過' : '待審核' }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      min-width="100"
    >
      <template #default="scope">
        <el-button
          type="danger"
          @click="emit('cancel', scope.row)"
          >取消</el-button
        >
        <el-button
          v-if="scope.row.confirmed === false"
          @click="emit('approve', scope.row)"
          >審核</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { Reservation } from '@/types/reservation';

interface Props {
  data?: Reservation[];
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});
const emit = defineEmits(['cancel', 'approve']);
</script>

<style scoped lang="postcss">
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
