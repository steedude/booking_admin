import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('roomReserve', () => {
  // 預約Array
  const reserveList: any = [];

  // 取得所有預約資訊
  async function getReservations() {
    // GET /api/admin/reservations
    console.log('getReservations');
    const data: any = await axios.get('/api/admin/reservations');
    console.log(data);
    return reserveList;
  }

  // 取消預約
  async function cancelReservation() {
    // DELETE /api/admin/reservation/:reservation_id
    console.log('cancelReservation');
  }

  // 確認預約
  async function confirmReservation() {
    // PUT /api/admin/reservation/:reservation_id
    console.log('confirmReservation');
  }

  // 新增預約
  async function sendReservation() {
    // POST /api/admin/reservation
    console.log('sendReservation');
  }

  return {
    reserveList,
    getReservations,
    cancelReservation,
    confirmReservation,
    sendReservation,
  };
});
