import Axios from "axios";
//import { toast } from 'react-toastify';

import * as S from '../constants/statistic.constants'

export const statisticAllAction = () => async (dispatch, getState) => {
  dispatch({
    type: S.ORDER_SUMMARY_TOTAL_REQUEST
  })
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/v1/statistic/all', {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_TOTAL_FAIL,
      payload: error.message
    })
  }
};

export const topCustomersAction = () => async (dispatch, getState) => {
  dispatch({
    type: S.TOP_CUSTOMER_REQUEST
  })
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/v1/statistic/topCustomer', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({
      type: S.TOP_CUSTOMER_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: S.TOP_CUSTOMER_FAIL,
      payload: message
    })
  }
};

export const sumarryOrders = (by) => async (dispatch, getState) => {
  dispatch({
    type: S.ORDER_SUMMARY_REQUEST
  })

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await Axios.get(`/v1/statistic/revenue/${by}`, config)
    dispatch({
      type: S.ORDER_SUMMARY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: S.ORDER_SUMMARY_FAIL,
      payload: error.message
    })
  }
};




