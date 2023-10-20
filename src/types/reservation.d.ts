import { Product } from './product';

export interface User {
  account: string;
  name: string;
}

export interface ProductByDay {
  _id: string;
  name: string;
}

// booking data list
export interface Reservation {
  _id: string;
  start_time: string;
  end_time: string;
  confirmed: boolean;
  product_id: string;
  user_id: string;
  admin_id: string;
  team_id: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  user: User;
  team: string;
}

// booking data by day
export interface ReservationByDay {
  _id: string;
  start_time: string;
  end_time: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  product: ProductByDay;
  team: string;
}

export interface ReservationState {
  page: number;
  page_size: number;
  total_page: number;
  total_size: number;
  reservations: Reservation[];
}

export interface FetchReservationPayload {
  start_time: string;
}

export interface FetchReservationsPayload {
  start_time: string;
  end_time: string;
  page: number;
  page_size: number;
  seats: number;
  product_id: string[];
}

export interface PostReservationPayload {
  start_time: string;
  end_time: string;
  team_id: string;
  product_id: string;
}
