export interface Product {
  _id: string;
  name: string;
  seats: number;
  image: string[];
  description: string;
  projector: boolean;
  television: boolean;
  is_confirmed: boolean;
  window: boolean;
}

export interface FetchProductsPayload {
  products: Product[];
}

export interface CreateProductPayload extends Omit<Product, '_id'> {}
export interface UpdateProductPayload extends Omit<Product, '_id'> {}
