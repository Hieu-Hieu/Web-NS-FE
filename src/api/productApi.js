import axiosClient from "./axiosClient";

const productApi = {
  getAllProducts: (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
};

export default productApi;