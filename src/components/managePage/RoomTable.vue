<template>
  <!-- 會議室管理中的會議室列表表格 -->
  <el-table :data="props.data">
    <!-- <el-table-column
      prop="_id"
      label="id"
      width="50"
    /> -->
    <el-table-column
      prop="name"
      label="名稱"
    />
    <el-table-column
      prop="images"
      label="預覽圖"
    >
      <template #default>
        <img src="https://placehold.jp/631d46/ffffff/70x70.png" />
      </template>
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
    />
    <el-table-column
      prop="seats"
      label="座位"
      align="center"
    />
    <el-table-column
      prop="projector"
      label="投影機"
      align="center"
    >
      <template #default="scope">
        {{ scope.row.projector === true ? '有' : '無' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="television"
      label="電視"
      align="center"
    >
      <template #default="scope">
        {{ scope.row.television === true ? '有' : '無' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="window"
      label="對外窗"
      align="center"
    >
      <template #default="scope">
        {{ scope.row.window === true ? '有' : '無' }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      min-width="100"
    >
      <template #default="scope">
        <el-button @click="emit('edit', scope.row)">修改</el-button>
        <el-button
          type="danger"
          @click="emit('delete', scope.row._id)"
          >刪除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { Product } from '@/types/product';

interface Props {
  data?: Product[];
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});
const emit = defineEmits(['edit', 'delete']);
</script>

<style scoped lang="postcss"></style>
