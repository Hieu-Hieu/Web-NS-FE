import * as S from "../constants/statistic.constants";
import statisticApi from "../../api/statisticApi";

export const statisticAllAction = () => async (dispatch, getState) => {
  dispatch({
    type: S.ORDER_SUMMARY_TOTAL_REQUEST,
  });
  try {
    const data = await statisticApi.statisticAll();
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_FAIL,
      payload: error.message,
    });
  }
};

export const topCustomersAction = () => async (dispatch, getState) => {
  dispatch({
    type: S.TOP_CUSTOMER_REQUEST,
  });
  try {
    const data = await statisticApi.topCustomers();
    dispatch({
      type: S.TOP_CUSTOMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: S.TOP_CUSTOMER_FAIL,
      payload: message,
    });
  }
};

export const sumarryOrders = (by) => async (dispatch, getState) => {
  dispatch({
    type: S.ORDER_SUMMARY_REQUEST,
  });
  try {
    const data = await statisticApi.summaryOrder(by);
    dispatch({
      type: S.ORDER_SUMMARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_FAIL,
      payload: error.message,
    });
  }
};
