import { defineStore } from 'pinia';
import { ref } from 'vue';
import { googleAuthApi, loginApi, logoutApi, registerApi } from '@/apis/login';
import { LoginPayload, GoogleAuthPayload } from '@/types/user';

const tokenKey = import.meta.env.VITE_TOKEN_LOCAL_STORAGE_KEY || process.env.TOKEN_LOCAL_STORAGE_KEY;

export default defineStore(
  'user',
  () => {
    const name = ref('');
    const account = ref('');
    const team = ref('');

    function setToken(tokenStr: string) {
      localStorage.setItem(tokenKey, tokenStr);
    }

    function getToken() {
      return localStorage.getItem(tokenKey);
    }

    async function logoutUser() {
      await logoutApi();
      localStorage.removeItem(tokenKey);
      name.value = '';
      account.value = '';
      team.value = '';
    }

    async function loginUserByGoogle(data: GoogleAuthPayload) {
      const res = await googleAuthApi(data);
      const { token, user } = res.data;
      setToken(token);
      name.value = user.name;
      account.value = user.account;
    }

    async function loginUser(data: LoginPayload) {
      const res = await loginApi(data);
      const { token, user } = res.data;
      setToken(token);
      name.value = user.name;
      account.value = user.account;
    }

    async function registerUser(data: LoginPayload) {
      const res = await registerApi(data);
      const { token, user } = res.data;
      setToken(token);
      name.value = user.name;
      account.value = user.account;
    }

    return {
      name,
      account,
      team,
      getToken,
      loginUser,
      registerUser,
      logoutUser,
      loginUserByGoogle,
    };
  },
  {
    persist: true,
  },
);
