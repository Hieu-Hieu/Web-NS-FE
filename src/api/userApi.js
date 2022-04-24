import axiosClient from "./axiosClient";

const userApi = {
    getAllUsers: (pageNumber, keyword) => {
        const url = `/user?pageNumber=${pageNumber}&keyword=${keyword}`;
        return axiosClient.get(url);
    },
    getUserById: (userId) => {
        const url = `/user/profile/${userId}`;
        return axiosClient.get(url);
    },
    deleteUser: (userId) => {
        const url = `/user/${userId}`;
        return axiosClient.delete(url);
    },
    register: (useInfo) => {
        const url = '/user/register';
        return axiosClient.post(url, useInfo);
    },
    updateProfile: (profile) => {
        const url = '/user/profile';
        return axiosClient.put(url, profile);
    },
    resetPassword: (data) => {
        const url = '/user/reset-password';
        return axiosClient.put(url, data);
    },
    fogotPassword: (email) => {
        const url = '/user/send-code-reset-password';
        return axiosClient.put(url, { email });
    },
    googleLogin: (token, ggid) => {
        const url = '/user/googleLogin';
        return axiosClient.post(url, { token, ggid });
    },
    loginWithPassword: (email, password) => {
        const url = '/user/login';
        return axiosClient.post(url, { email, password });
    },

};

export default userApi;
