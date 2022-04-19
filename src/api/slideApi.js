import axiosClient from "./axiosClient";

const slideApi = {
    getListSlides: (params) => {
        const url = "/slide";
        return axiosClient.get(url, { params });
    },
    getListSlidesPrivate: () => {
        const url = '/slide/admin';
        return axiosClient.get(url);
    },
    addSlide: () => {
        const url = "/slide"
        return axiosClient.post(url);
    },
    updateSlide: (id) => {
        const url = `/slide/${id}`;
        return axiosClient.put(url);
    },
    deleteSlide: (id) => {
        const url = `/slide/${id}`
        return axiosClient.delete(url);
    }
};

export default slideApi;
