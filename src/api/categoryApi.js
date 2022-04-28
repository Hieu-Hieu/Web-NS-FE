import axiosClient from "./axiosClient";

const categoryApi = {
    getCategories: (params) => {
        const url = "/category";
        return axiosClient.get(url, { params });
    },
    getCategory: (categoryId) => {
        const url = `/category/${categoryId}`;
        return axiosClient.get(url);
    },
    getCategoriesPrivate: () => {
        const url = '/category/admin';
        return axiosClient.get(url);
    },
    addCategory: (category) => {
        const url = "/category"
        return axiosClient.post(url, category);
    },
    updateCategory: (category) => {
        const url = `/category/${category._id}`;
        return axiosClient.put(url, category);
    },
    deleteCategory: (id) => {
        const url = `/category/${id}`
        return axiosClient.delete(url);
    }
};

export default categoryApi;
