import axiosClient from "./axiosClient";

const orderApi = {
  myOrders: () => {
    const url = "/order/myOrder";
    return axiosClient.get(url);
  },
  createOrder: (order) => {
    const url = "/order";
    return axiosClient.post(url, order);
  },
  sendMailOrder: (order) => {
    const url = "/order/sendmail";
    return axiosClient.post(url, order);
  },
  getOrderDetail: (orderid) => {
    const url = `/order/${orderid}`;
    return axiosClient.get(url);
  },
  getOrders: (role, pageNumber, keyword) => {
    const url =
      role === "user"
        ? "/order"
        : `/order/admin?pageNumber=${pageNumber}&keyword=${keyword}`;
    return axiosClient.get(url);
  },
  updateOrderStatus: (productId, status, pageNumber) => {
    const url = `/order/${productId}`;
    return axiosClient.put(url, { status });
  },
  userUpdateOrderStatus: (productId, status) => {
    const url = `/order/myOrder/${productId}`;
    return axiosClient.put(url, { status });
  },
  payOrder: (orderid, paymentResult) => {
    const url = `/order/online-pay/${orderid}`;
    return axiosClient.put(url, paymentResult);
  },

  getShippingServices: (data) => {
    const url = `/order/shipping-services`;
    return axiosClient.post(url, data);
  },
  getShippingFee: (data) => {
    const url = `/order/shipping-fee`;
    return axiosClient.post(url, data);
  },
  getShippingLeadtime: (data) => {
    const url = `/order/shipping-leadtime`;
    return axiosClient.post(url, data);
  },
};

export default orderApi;
