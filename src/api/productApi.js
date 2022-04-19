import axiosClient from "./axiosClient";

const productApi = {
  getAllProducts: (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getProductCategories: () => {
    const url = '/products/categories';
    return axiosClient.get(url);
  },
  getProductDetail: (productId) => {
    const url = `/products/${productId}`;
    return axiosClient.get(url);
  },
  getTopProducts: () => {
    const url = "/products/top-product";
    return axiosClient.get(url);
  },
  getTopProductsRelate: (productId) => {
    const url = `/products/product-related/${productId}`
    return axiosClient.get(url);
  }
};

export default productApi;
