import request from '@/utils/request';
import type { CreateProductPayload, UpdateProductPayload } from '@/types/product';

export function getProductListApi() {
  return request.get('/api/admin/products');
}

export function createNewProductApi(data: CreateProductPayload) {
  return request.post('/api/admin/product', data);
}

export function updateProductApi(productId: string, data: UpdateProductPayload) {
  return request.put(`/api/admin/product/${productId}`, data);
}

export function deleteProductApi(productId: string) {
  return request.delete(`/api/admin/product/${productId}`);
}
