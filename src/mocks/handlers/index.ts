import mockUserApi from '@/mocks/handlers/apis/user';
import mockProductApi from '@/mocks/handlers/apis/product';
import mockReservationApi from '@/mocks/handlers/apis/reservation';

export const handlers = [
  mockUserApi.loginUser,
  mockUserApi.getUserInfo,
  mockUserApi.logoutUser,
  mockUserApi.postGoogleAuth,

  mockProductApi.getProductList,
  mockProductApi.getProductInfo,
  mockProductApi.createNewProduct,
  mockProductApi.updateProductInfo,
  mockProductApi.deleteProduct,

  mockReservationApi.getReservations,
  mockReservationApi.getReservationByDay,
  mockReservationApi.createNewReservation,
  mockReservationApi.cancelReservation,
  mockReservationApi.approveReservation,
];
