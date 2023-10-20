import request from '@/utils/request';
import type { LoginPayload, GoogleAuthPayload } from '@/types/user';
import { apiPrefix } from '@/utils/constant';

export function loginApi(data: LoginPayload) {
  return request.post(`${apiPrefix}/login`, data);
}

export function registerApi(data: LoginPayload) {
  return request.post(`${apiPrefix}/register`, data);
}

export function googleAuthApi(data: GoogleAuthPayload) {
  return request.post(`${apiPrefix}/googleAuth`, data);
}

export function logoutApi() {
  return request.post(`${apiPrefix}/logout`);
}
