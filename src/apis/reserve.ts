import request from '@/utils/request';

export function getReservations() {
  return request.get('/api/admin/reservations');
}

export function cancelReservation() {
  return request.delete('/api/admin/reservation/:reservation_id');
}

export function confirmReservation() {
  return request.put('/api/admin/reservation/:reservation_id');
}

export function sendReservation() {
  return request.post('/api/admin/reservation');
}
