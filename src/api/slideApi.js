import axiosClient from "./axiosClient";

const slideApi = {
    getListSlides: (params) => {
        const url = "/slide";
        return axiosClient.get(url, { params });
    },
    getSlide: (id) => {
        const url = `/slide/${id}`;
        return axiosClient.get(url);
    },
    getListSlidesPrivate: () => {
        const url = '/slide/admin';
        return axiosClient.get(url);
    },
    addSlide: (slide) => {
        const url = "/slide"
        return axiosClient.post(url, slide);
    },
    updateSlide: (slide) => {
        const url = `/slide/${slide._id}`;
        return axiosClient.put(url, slide);
    },
    deleteSlide: (id) => {
        const url = `/slide/${id}`
        return axiosClient.delete(url);
    }
};

export default slideApi;
