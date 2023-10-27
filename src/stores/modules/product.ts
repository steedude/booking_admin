import { defineStore } from 'pinia';
import { ref } from 'vue';

import { Product, CreateProductPayload, UpdateProductPayload } from '@/types/product';
import { getProductListApi, createNewProductApi, updateProductApi, deleteProductApi } from '@/apis/product';
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

  async function createNewProduct(product: CreateProductPayload) {
    const res = await createNewProductApi(product);
    showMessage(res);
    await getProductList();
  }

  async function updateProduct(productId: string, payload: UpdateProductPayload) {
    const res = await updateProductApi(productId, payload);
    showMessage(res);
    await getProductList();
  }
  async function deleteProduct(productId: string) {
    const res = await deleteProductApi(productId);
    showMessage(res);
    await getProductList();
  }

  return {
    products,
    getProductList,
    createNewProduct,
    updateProduct,
    deleteProduct,
  };
});
