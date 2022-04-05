import Axios from 'axios'
import { toast } from 'react-toastify';

import * as b from '../constants/brandConstants'

export const addBrandAction = (brand) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.post('/v1/brand', brand, config)

    dispatch({ type: b.BRAND_CREATE_SUCCESS, payload: data });
    toast.success('Thêm thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_CREATE_FAIL, payload: message })
    toast.error(message)
  }
};

export const updateBrandAction = (brand) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.put(`/v1/brand/${brand._id}`, brand, config)
    toast.success('Cập nhật thành công')

    dispatch({ type: b.BRAND_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_UPDATE_FAIL, payload: message })
    toast.error('Cập nhật thất bại')
  }
};

export const deleteBrandAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: b.BRAND_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.delete(`/v1/brand/${id}`, config)

    dispatch({ type: b.BRAND_DELETE_SUCCESS, payload: data });
    dispatch(listBrandAction());
    toast.success('Xóa thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: b.BRAND_DELETE_FAIL, payload: message })
    toast.error('Xóa thất bại')
  }
};
export const listBrandAction = () => async (dispatch) => {
  dispatch({ type: b.BRAND_LIST_REQUEST });

  try {
    const { data } = await Axios.get('/v1/brand');
    dispatch({ type: b.BRAND_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: b.BRAND_LIST_FAIL, payload: message })
  }
};

export const detailBrandAction = (id) => async (dispatch, getState) => {
  dispatch({ type: b.BRAND_DETAILS_REQUEST })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.get(`/v1/brand/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: b.BRAND_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: b.BRAND_DETAILS_FAIL, payload: message })
  }
};