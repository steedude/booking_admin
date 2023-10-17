import request from '@/utils/request';
import { apiPrefix } from '@/utils/constant';

export function getReservationsApi() {
  return request.get(`${apiPrefix}/reservations`);
}

export function cancelReservationApi() {
  return request.delete(`${apiPrefix}/reservation/:reservation_id`);
}

export function confirmReservationApi() {
  return request.put(`${apiPrefix}/reservation/:reservation_id`);
}

export function sendReservationApi() {
  return request.post(`${apiPrefix}/reservation`);
}
