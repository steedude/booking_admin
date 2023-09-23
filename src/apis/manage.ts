import request from '@/utils/request';

export function getRoomList() {
  return request.get('/api/admin/products');
}

export function createNewRoom() {
  return request.post('/api/admin/product');
}

export function updateRoomInfo() {
  return request.put('/api/admin/product/:product_id');
}

export function deleteRoom() {
  return request.delete('/api/admin/product/:product_id');
}
