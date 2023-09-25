import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginApi, registerApi } from '@/apis/login';

export default defineStore('user', () => {
  // 使用者名稱
  const name = ref('');
  // 使用者所屬團隊
  const team = ref('');

  // 登入
  async function login() {
    const data: any = await loginApi();
    console.log(data);
  }

  // 註冊
  async function register() {
    const data: any = await registerApi();
    console.log(data);
  }

  return {
    name,
    team,
    login,
    register,
  };
});
