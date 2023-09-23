import { defineStore } from 'pinia';
import { getReservations } from '@/apis/reserve';

export default defineStore('roomReserve', () => {
  // 預約Array
  const reserveList: any = [];

  async function fetchReservations() {
    const { data, message, status } = await getReservations();

    reserveList.value = data.reservations;
    console.log({ data, message, status });
    return data;
  }

  return {
    reserveList,
    fetchReservations,
  };
});
