<template>
  <div class="flex flex-col justify-center items-center">
    <div class="my-10 text-4xl">Admin預約管理系統 {{ envTest }}</div>

    <el-tabs type="border-card">
      <el-tab-pane label="Login">
        <AuthForm
          is-login
          @login="onLogin"
        >
          <GoogleLogin
            :callback="callback"
            prompt
          />
        </AuthForm>
      </el-tab-pane>
      <el-tab-pane label="Register">
        <AuthForm @register="onRegister">
          <GoogleLogin
            :callback="callback"
            prompt
          />
        </AuthForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElNotification } from 'element-plus';
import AuthForm from '@/components/authPage/AuthForm.vue';
import { useUserStore } from '@/stores';
const { loginUser, registerUser, loginUserByGoogle } = useUserStore();
import { LoginPayload } from '@/types/user';
import router from '@/router';
import { computed } from 'vue';

async function onLogin(formData: LoginPayload) {
  try {
    await loginUser(formData);
    await router.push('/');
    ElNotification.success({
      message: '登入成功',
      appendTo: '#app',
    });
  } catch (error: any) {
    const message = error?.response.data.errorMessage || '認證錯誤';
    ElMessage.error({
      message,
      type: 'error',
      appendTo: '#app',
    });
  }
}

async function onRegister(formData: LoginPayload) {
  try {
    await registerUser(formData);
    await router.push('/');
  } catch (error: any) {
    const message = error?.response.data.errorMessage || '認證錯誤';
    ElMessage.error({
      message,
      type: 'error',
      appendTo: '#app',
    });
  }
}

const callback = async (response: any) => {
  try {
    const { credential } = response;
    console.log('credential:', credential);
    await loginUserByGoogle({ credential });
    await router.push('/');
  } catch (error: any) {
    const message = error?.response.data.errorMessage || '認證錯誤';
    ElMessage.error({
      message,
      type: 'error',
      appendTo: '#app',
    });
  }
};

const envTest = computed(() => {
  return import.meta.env.VITE_ENV_TEST;
});
</script>

<style scoped lang="postcss"></style>
