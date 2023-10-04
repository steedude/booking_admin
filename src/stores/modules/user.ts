import { defineStore } from 'pinia';
import { ref } from 'vue';
import { googleAuthApi, loginApi, logoutApi } from '@/apis/login';
import { LoginPayload, GoogleAuthPayload } from '@/types/user';
export default defineStore(
  'user',
  () => {
    const name = ref('');
    const account = ref('');
    const team = ref('');

    function setToken(tokenStr: string) {
      localStorage.setItem('booking_fe_token', tokenStr);
    }

    function getToken() {
      return localStorage.getItem('booking_fe_token');
    }

    async function logoutUser() {
      await logoutApi();
      localStorage.removeItem('booking_fe_token');
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
      team.value = user.team;
    }

    async function loginUser(data: LoginPayload) {
      const res = await loginApi(data);
      const { token, user } = res.data;
      setToken(token);
      name.value = user.name;
      account.value = user.account;
      team.value = user.team;
    }

    return {
      name,
      account,
      team,
      getToken,
      loginUser,
      logoutUser,
      loginUserByGoogle,
    };
  },
  {
    persist: true,
  },
);
