import request from '@/utils/request';

export function getReservationsApi() {
  return request.get('/api/admin/reservations');
}

export function cancelReservationApi() {
  return request.delete('/api/admin/reservation/:reservation_id');
}

export function confirmReservationApi() {
  return request.put('/api/admin/reservation/:reservation_id');
}

export function sendReservationApi() {
  return request.post('/api/admin/reservation');
}
