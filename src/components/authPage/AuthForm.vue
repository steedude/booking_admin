<template>
  <el-card>
    <template #header>
      <div class="mb-2">
        {{ props.isLogin ? '登入帳號' : '註冊帳號' }}
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          label="account"
          prop="account"
        >
          <el-input v-model="ruleForm.account" />
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          v-if="!props.isLogin"
          label="Confirm"
          prop="checkPass"
        >
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            {{ props.isLogin ? '登入' : '註冊' }}
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">清除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <div class="mb-2">或用 Google 登入</div>
      <slot />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

interface Props {
  isLogin?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLogin: false,
});

const ruleFormRef = ref<FormInstance>();

const emit = defineEmits(['login', 'register']);

const ruleForm = reactive({
  account: '',
  password: '',
  checkPass: '',
});

const validatePass = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [
    { required: true, message: 'Please input the account', trigger: 'blur' },
    {
      min: 6,
      max: 26,
      message: 'Length should be 6 to 26',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Please input the password', trigger: 'blur' },
    {
      min: 6,
      max: 26,
      message: 'Length should be 6 to 26',
      trigger: 'blur',
    },
  ],
  checkPass: [{ required: true, validator: validatePass, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log('submit! ruleForm:', ruleForm);

      if (props.isLogin) {
        emit('login', ruleForm);
      } else {
        emit('register', ruleForm);
      }

      return true;
    }
    console.log('error submit!');
    return false;
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="postcss"></style>
