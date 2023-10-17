import request from '@/utils/request';
import { apiPrefix } from '@/utils/constant';

export function getRoomListApi() {
  return request.get(`${apiPrefix}/products`);
}

export function createNewRoomApi() {
  return request.post(`${apiPrefix}/product`);
}

export function updateRoomInfoApi() {
  return request.put(`${apiPrefix}/product/:product_id`);
}

export function deleteRoomApi() {
  return request.delete(`${apiPrefix}/product/:product_id`);
}
