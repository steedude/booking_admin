<template>
  <div class="p-4">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      close-on-press-escape
      center
      align-center
      @closed="onClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
      >
        <el-form-item
          label="名稱"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formData.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="預覽圖"
          prop="image"
          :label-width="formLabelWidth"
        >
          <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :limit="2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
          >
            <el-icon><plus /></el-icon>
          </el-upload>

          <el-dialog v-model="previewImageVisible">
            <img
              w-full
              :src="previewImageUrl"
              alt="Preview Image"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="座位數"
          prop="seats"
          :label-width="formLabelWidth"
        >
          <el-input-number
            v-model="formData.seats"
            :min="1"
            :max="15"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formData.description"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="是否有投影機"
          :label-width="formLabelWidth"
        >
          <el-switch v-model="formData.projector" />
        </el-form-item>
        <el-form-item
          label="是否有電視"
          :label-width="formLabelWidth"
        >
          <el-switch v-model="formData.television" />
        </el-form-item>
        <el-form-item
          label="是否有對外窗"
          :label-width="formLabelWidth"
        >
          <el-switch v-model="formData.window" />
        </el-form-item>
        <el-form-item
          label="是否需要審核"
          :label-width="formLabelWidth"
        >
          <el-switch v-model="formData.is_confirmed" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            auto-insert-space
            @click="onClose"
            >取消</el-button
          >
          <el-button
            type="primary"
            auto-insert-space
            @click="onValidate(formRef)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus';
import { computed } from 'vue';
import { reactive } from 'vue';
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores';
import { Plus } from '@element-plus/icons-vue';
const store = useProductStore();
const formRef = ref<FormInstance>();
const formLabelWidth = '140px';

const dialogVisible = ref(false);

const isCreateRef = ref(true);
const editId = ref();

const initialValue: any = {
  _id: '',
  name: '',
  seats: 0,
  image: [],
  description: '',
  projector: true,
  television: true,
  is_confirmed: false,
  window: true,
};
const formData: any = reactive(Object.assign({}, initialValue));
const dialogTitle = computed(() => (isCreateRef.value ? '新增會議室' : '修改會議室'));

const rules = reactive<FormRules<typeof formData>>({
  name: [
    { required: true, message: 'Please input the account', trigger: 'blur' },
    {
      min: 3,
      max: 20,
      message: 'Length should be 3 to 20',
      trigger: 'blur',
    },
  ],
  description: [
    { required: true, message: 'Please input the password', trigger: 'blur' },
    {
      max: 100,
      message: 'Max Length should be 100',
      trigger: 'blur',
    },
  ],
});

// upload image
const fileList = ref<UploadUserFile[]>();

const previewImageUrl = ref('');
const previewImageVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('handleRemove', uploadFile, uploadFiles);
  formData.image = uploadFiles.map(file => file.url);
};

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  previewImageUrl.value = uploadFile.url!;
  previewImageVisible.value = true;
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  );
};

// == life cycle ==

onMounted(async () => {});

// == actions ==
function resetForm() {
  Object.keys(formData).forEach(key => {
    formData[`${key}`] = initialValue[`${key}`];
  });
  fileList.value = [];
  editId.value = null;
}

function setDialogVisible(isCreate: boolean, options?: any) {
  isCreateRef.value = isCreate;
  if (!isCreate && options.form) {
    const { form } = options;
    // eslint-disable-next-line no-underscore-dangle
    editId.value = form._id;
    Object.keys(formData).forEach(key => {
      formData[`${key}`] = form[`${key}`];
      if (key === 'image' && form[`${key}`].length > 0) {
        fileList.value = form[`${key}`].map((url: string) => ({
          name: url.split('/').pop(),
          url,
        }));
      }
    });
  } else {
    resetForm();
  }

  dialogVisible.value = true;
}

// == events ==
function onClose() {
  dialogVisible.value = false;
  resetForm();
}
async function handleConfirm() {
  if (isCreateRef.value) {
    await store.createNewProduct(formData);
  } else {
    await store.updateProduct(editId.value, formData);
  }
  onClose();
}

const onValidate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      handleConfirm();
      return true;
    }
    ElMessage.error('error submit!');
    return false;
  });
};

// == expose ==
defineExpose({
  setDialogVisible,
});
</script>

<style scoped lang="postcss"></style>
