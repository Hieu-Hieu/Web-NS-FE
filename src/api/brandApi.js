import axiosClient from "./axiosClient";

const brandApi = {
  getBrands: (params) => {
    const url = "/brand";
    return axiosClient.get(url, { params });
  },
  getBrandsPrivate: () => {
    const url = "/brand/admin";
    return axiosClient.get(url);
  },
  addBrand: (data) => {
    const url = "/brand";
    return axiosClient.post(url, data);
  },
  updateBrand: (id) => {
    const url = `/brand/${id}`;
    return axiosClient.put(url);
  },
  deleteBrand: (id) => {
    const url = `/brand/${id}`;
    return axiosClient.delete(url);
  },
};

export default brandApi;
