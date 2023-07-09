import React, { useEffect } from "react";

import "../styles/loading.css";
import Loading from "./Loading";
import paymentApi from "../api/paymentApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const PaymentLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    paymentApi.getPaymentResult(params).then(({ status, message }) => {
      if (status) {
        notification.success({ message });
        navigate("/order-history");
      }
    });
  }, []);

  return <Loading />;
};

export default PaymentLoading;
