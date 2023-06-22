import axiosClient from "./axiosClient";

const commentApi = {
  getListComments: (params) => {
    const { productId } = params;
    const url = `/comment/${productId}`;
    return axiosClient.get(url);
  },
  createComment: (data) => {
    const url = `/comment`;
    return axiosClient.post(url, data);
  },
  getListSlidesPrivate: () => {
    const url = "/slide/admin";
    return axiosClient.get(url);
  },
  addSlide: (slide) => {
    const url = "/slide";
    return axiosClient.post(url, slide);
  },
  updateSlide: (slide) => {
    const url = `/slide/${slide._id}`;
    return axiosClient.put(url, slide);
  },
  deleteSlide: (id) => {
    const url = `/slide/${id}`;
    return axiosClient.delete(url);
  },
};

export default commentApi;
