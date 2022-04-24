import axiosClient from "./axiosClient";

const categoryApi = {
    getCategories: (params) => {
        const url = "/category";
        return axiosClient.get(url, { params });
    },
    getCategoriesPrivate: () => {
        const url = '/category/admin';
        return axiosClient.get(url);
    },
    addCategory: () => {
        const url = "/category"
        return axiosClient.post(url);
    },
    updateCategory: (id) => {
        const url = `/category/${id}`;
        return axiosClient.put(url);
    },
    deleteCategory: (id) => {
        const url = `/category/${id}`
        return axiosClient.delete(url);
    }
};

export default categoryApi;
