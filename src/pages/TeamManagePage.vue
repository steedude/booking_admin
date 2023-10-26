<template>
  <el-card class="m-4">
    <div>團隊管理</div>
    <el-table
      v-loading="teamData.loading"
      :data="teamData.list"
      height="500"
      style="width: 100%"
    >
      <el-table-column
        prop="_id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="團隊名稱"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="onOpenDialog('edit', scope.row)"
          >
            編輯
          </el-button>

          <el-button
            link
            type="danger"
            size="small"
            @click.prevent="onOpenDeleteDialog(scope.row)"
          >
            刪除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="mt-4"
      type="primary"
      style="width: 40%"
      @click.prevent="onOpenDialog('create')"
    >
      新增團隊
    </el-button>
  </el-card>

  <el-dialog
    v-model="teamDialog.visible"
    :title="teamDialogTitle"
    width="30%"
    center
  >
    <span>
      <el-input
        v-model="teamDialog.name"
        placeholder="請輸入團隊名稱"
      ></el-input>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="teamDialog.visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="onConfirmDialog"
        >
          確認
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="teamDeleteDialog.visible"
    title="刪除團隊"
    width="30%"
    center
  >
    <span> 確認刪除{{ teamDeleteDialog.name }} ? </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="teamDeleteDialog.visible = false">取消</el-button>
        <el-button
          type="danger"
          @click="deleteRow(teamDeleteDialog.id)"
        >
          確認
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getTeamsApi, createTeamApi, deleteTeamApi, editTeamApi } from '@/apis/team';
import { onMounted, onUnmounted, reactive, computed } from 'vue';

type TeamDialogMode = 'edit' | 'create';

const teamData = reactive({
  list: [],
  loading: true,
});

const teamDialog = reactive({
  visible: false,
  mode: 'edit',
  id: '',
  name: '',
});

const teamDeleteDialog = reactive({
  visible: false,
  id: '',
  name: '',
});

async function getTeams() {
  teamData.loading = true;
  const { data } = await getTeamsApi();
  teamData.list = data;
  teamData.loading = false;
}

const deleteRow = async (id: string) => {
  await deleteTeamApi(id);
  await getTeams();
  teamDeleteDialog.visible = false;
};

const onOpenDialog = (mode: TeamDialogMode, row?: any) => {
  teamDialog.visible = true;
  teamDialog.mode = mode;
  if (row) {
    const { _id: teamId, name } = row;
    teamDialog.id = teamId;
    teamDialog.name = name;
  } else {
    teamDialog.id = '';
    teamDialog.name = '';
  }
};

const onOpenDeleteDialog = (row: any) => {
  teamDeleteDialog.visible = true;
  const { _id: teamId, name } = row;
  teamDeleteDialog.id = teamId;
  teamDeleteDialog.name = name;
};

const onConfirmDialog = async () => {
  if (teamDialog.mode === 'create') {
    await createTeamApi({ name: teamDialog.name });
  } else {
    await editTeamApi(teamDialog.id, { name: teamDialog.name });
  }
  await getTeams();
  teamDialog.visible = false;
};

const teamDialogTitle = computed(() => {
  return teamDialog.mode === 'create' ? '建立團隊' : '編輯團隊';
});

onMounted(() => {
  getTeams();
});

onUnmounted(() => {});
</script>

<style scoped lang="postcss"></style>
