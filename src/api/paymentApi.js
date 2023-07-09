import axiosClient from "./axiosClient";

const paymentApi = {
  createPaymentUrl: (orderId) => {
    const url = "/payment/create-payment-url";
    return axiosClient.post(url, { orderId: orderId });
  },
  getPaymentResult: (data) => {
    const url = "/payment/vnpay-payment-result";
    return axiosClient.post(url, data);
  },
};

export default paymentApi;
