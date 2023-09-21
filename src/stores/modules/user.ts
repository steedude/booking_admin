import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('user', () => {
  // 使用者名稱
  const name = ref('');
  // 使用者所屬團隊
  const team = ref('');

  // 登入
  async function login() {
    // POST /api/admin/login
    console.log('login');
  }

  // 註冊
  async function register() {
    //  POST /api/admin/register
    console.log('register');
  }

  return {
    name,
    team,
    login,
    register,
  };
});
