import request from '@/utils/request';

export function loginApi() {
  return request.get('/api/admin/login');
}

export function registerApi() {
  return request.post('/api/admin/register');
}
