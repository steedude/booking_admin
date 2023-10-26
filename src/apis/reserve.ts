import request from '@/utils/request';
import { apiPrefix } from '@/utils/constant';
import type { FetchReservationsPayload } from '@/types/reservation';

export function getReservationsApi(data: FetchReservationsPayload) {
  return request.get(`${apiPrefix}/reservations/day`, { params: data });
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
