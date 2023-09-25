import request from '@/utils/request';

export function getRoomListApi() {
  return request.get('/api/admin/products');
}

export function createNewRoomApi() {
  return request.post('/api/admin/product');
}

export function updateRoomInfoApi() {
  return request.put('/api/admin/product/:product_id');
}

export function deleteRoomApi() {
  return request.delete('/api/admin/product/:product_id');
}
