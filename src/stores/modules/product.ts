import { defineStore } from 'pinia';
import { ref } from 'vue';

import { Product, CreateProductPayload, UpdateProductPayload } from '@/types/product';
import {
  getProductListApi,
  getProductApi,
  createNewProductApi,
  updateProductApi,
  deleteProductApi,
} from '@/apis/product';
import { ElMessage } from 'element-plus';

export default defineStore('product', () => {
  const products = ref<Product[]>();

  function showMessage(res: any) {
    if (res.status === 200) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  }

  async function getProductList() {
    const res = await getProductListApi();
    products.value = res.data.products;
  }

  async function getProduct(id: string) {
    const res = await getProductApi(id);
    showMessage(res);
  }

  async function createNewProduct(prodcut: CreateProductPayload) {
    const res = await createNewProductApi(prodcut);
    showMessage(res);
    getProductList();
  }

  async function updateProduct(productId: string, payload: UpdateProductPayload) {
    const res = await updateProductApi(productId, payload);
    showMessage(res);
    getProductList();
  }
  async function deleteProduct(productId: string) {
    const res = await deleteProductApi(productId);
    showMessage(res);
    getProductList();
  }

  return {
    products,
    getProductList,
    getProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
  };
});
