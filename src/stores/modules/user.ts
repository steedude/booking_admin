import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export default defineStore('user', () => {
  // 使用者名稱
  const name = ref('');
  // 使用者所屬團隊
  const team = ref('');

  // 登入
  async function login() {
    // POST /api/admin/login
    const data: any = await axios.post('/api/admin/login');
    console.log(data);
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
