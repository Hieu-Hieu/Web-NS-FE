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
  },
  getProductsAdmin: (pageNumber, keyword) => {
    const url = `/products/admin/search?pageNumber=${pageNumber}&keyword=${keyword}`
    return axiosClient.get(url);
  },
  addProduct: (product) => {
    const url = `/products`
    return axiosClient.post(url, product);
  },
  updateProduct: (product) => {
    const url = `/products/${product._id}`
    return axiosClient.put(url, product);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`
    return axiosClient.delete(url);
  },

};

export default productApi;
