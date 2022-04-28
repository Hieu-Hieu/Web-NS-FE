import axiosClient from "./axiosClient";

const statisticApi = {
    statisticAll: () => {
        const url = "/statistic/all";
        return axiosClient.get(url);
    },
    topCustomers: () => {
        const url = '/statistic/topCustomer';
        return axiosClient.get(url);
    },
    summaryOrder: (by) => {
        const url = `/statistic/revenue/${by}`;
        return axiosClient.get(url);
    },
};

export default statisticApi;
