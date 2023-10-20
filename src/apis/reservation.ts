import request from '@/utils/request';
import type { FetchReservationsPayload, FetchReservationPayload, PostReservationPayload } from '@/types/reservation';

// 預約列表
export function getReservationsApi(data: FetchReservationsPayload) {
  return request.get('/api/admin/reservations', { params: data });
}

// 檢視當日預約狀態
export function getReservationByDayApi(data: FetchReservationPayload) {
  return request.get('/api/admin/reservations/day', { params: data });
}

// 新增預約
export function postReservationApi(data: PostReservationPayload) {
  return request.post('/api/admin/reservation', data);
}

// 取消預約
export function cancelReservationApi(reservationId: string) {
  return request.delete(`/api/admin/reservation/${reservationId}`);
}

// 同意預約
export function approveReservationApi(reservationId: string) {
  return request.put(`/api/admin/reservation/${reservationId}`);
}

// GET /api/admin/reservations 取預約列表
// GET /api/admin/reservations/day 看今日會議室預約狀態
// POST /api/admin/reservation 新增預約
// put /api/admin/reservation/:reservation_id 同意預約
// DELETE /api/admin/reservation/:reservation_id 取消某一筆預約
