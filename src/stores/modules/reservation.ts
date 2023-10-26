import { defineStore } from 'pinia';
import { onBeforeMount, ref } from 'vue';

import { Reservation, FetchReservationsPayload, PostReservationPayload } from '@/types/reservation';
import {
  getReservationsApi,
  getReservationByDayApi,
  postReservationApi,
  cancelReservationApi,
  approveReservationApi,
} from '@/apis/reservation';

import { Product } from '@/types/product';
import { getProductListApi } from '@/apis/product';

import { ElMessage } from 'element-plus';

export default defineStore('reservation', () => {
  const reservations = ref<Reservation[]>();
  const productId = ref([]);
  const seats = ref(0);
  const totalPage = ref(0); // total_page
  const totalSize = ref(0); // total_size
  const pageSize = ref(10); // page_size
  const currentPage = ref(1); // page

  const totalSeats = ref(10);
  const productList = ref<Product[]>();

  const currentDay = new Date().toJSON().slice(0, 10);
  const searchState = ref<FetchReservationsPayload>({
    start_time: `${currentDay} 00:00`,
    end_time: `${currentDay} 23:59:59`,
    page: currentPage.value,
    page_size: pageSize.value,
    seats: seats.value,
    product_id: productId.value,
  });

  function showMessage(res: any) {
    if (res.status === 200) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  }

  async function getReservationsList(data: FetchReservationsPayload = searchState.value) {
    const res = await getReservationsApi(data);

    reservations.value = res.data.reservations;
    searchState.value.page = res.data.page;
    searchState.value.page_size = res.data.page_size;

    totalPage.value = res.data.total_page;
    totalSize.value = res.data.total_size;
  }

  async function filterReservationDay(difference: number) {
    const now = new Date();
    const oneDayTime = 24 * 60 * 60 * 1000;
    const startDay = new Date(now.getTime() + difference * oneDayTime).toJSON().slice(0, 10);

    searchState.value.start_time = `${startDay} 00:00`;
    searchState.value.end_time = `${currentDay} 23:59:59`;
    const res = await getReservationsApi(searchState.value);
    reservations.value = res.data.reservations;
  }

  async function getReservationByDay(data: FetchReservationsPayload) {
    const res = await getReservationByDayApi(data);
    console.log('getReservationByDay', res);
  }

  async function postReservation(data: PostReservationPayload) {
    const res = await postReservationApi(data);
    showMessage(res);
    await getReservationsList(searchState.value);
  }
  async function cancelReservation(reservationId: string) {
    const res = await cancelReservationApi(reservationId);
    showMessage(res);
    await getReservationsList(searchState.value);
  }

  async function approveReservation(reservationId: string) {
    const res = await approveReservationApi(reservationId);
    showMessage(res);
    await getReservationsList(searchState.value);
  }

  onBeforeMount(async () => {
    const res = await getProductListApi();
    productList.value = res.data.products;
  });

  return {
    searchState,
    reservations,
    productId,
    seats,
    totalSize,
    totalPage,
    pageSize,
    currentPage,
    totalSeats,
    productList,
    filterReservationDay,
    getReservationsList,
    getReservationByDay,
    postReservation,
    cancelReservation,
    approveReservation,
  };
});
