import request from '@/utils/request';
import type { LoginPayload, GoogleAuthPayload } from '@/types/user';

export function loginApi(data: LoginPayload) {
  return request.post('/api/admin/login', data);
}

export function registerApi() {
  return request.post('/api/admin/register');
}

export function googleAuthApi(data: GoogleAuthPayload) {
  return request.post('/api/admin/google-auth', data);
}

export function logoutApi() {
  return request.get('/api/admin/logout');
}
