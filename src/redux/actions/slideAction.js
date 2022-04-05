import Axios from "axios";
import { toast } from 'react-toastify';

import {
  SLIDE_CREATE_FAIL, SLIDE_CREATE_REQUEST, SLIDE_CREATE_SUCCESS,
  SLIDE_DELETE_FAIL, SLIDE_DELETE_REQUEST, SLIDE_DELETE_SUCCESS,
  SLIDE_DETAILS_FAIL, SLIDE_DETAILS_REQUEST, SLIDE_DETAILS_SUCCESS, SLIDE_LIST_FAIL,
  SLIDE_LIST_REQUEST, SLIDE_LIST_SUCCESS, SLIDE_UPDATE_FAIL,
  SLIDE_UPDATE_REQUEST, SLIDE_UPDATE_SUCCESS
} from "../constants/slideConstants";

export const listSlides = () => async (dispatch) => {
  dispatch({
    type: SLIDE_LIST_REQUEST
  })

  try {
    const { data } = await Axios.get('/v1/slide')
    dispatch({
      type: SLIDE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SLIDE_LIST_FAIL,
      payload: error.message
    })
  }
};

export const listSlidesAdmin = () => async (dispatch, getState) => {
  dispatch({
    type: SLIDE_LIST_REQUEST
  })

  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await Axios.get('/v1/slide/admin', {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({
      type: SLIDE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SLIDE_LIST_FAIL,
      payload: error.message
    })
  }
};


export const addSlideAction = (slide) => async (dispatch, getState) => {
  dispatch({ type: SLIDE_CREATE_REQUEST })
  toast.update('Đang cập nhật')

  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await Axios.post('/v1/slide', slide, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({ type: SLIDE_CREATE_SUCCESS, payload: data })
    toast.success('Thêm thành công')
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: SLIDE_CREATE_FAIL, payload: message })
    toast.error(message);
  }
}

export const updateSlideAction = (slide) => async (dispatch, getState) => {
  dispatch({ type: SLIDE_UPDATE_REQUEST, payload: slide })
  toast.update('Đang cập nhật')
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.put(`/v1/slide/${slide._id}`, slide, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: SLIDE_UPDATE_SUCCESS, payload: data })
    toast.success('Cập nhật thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: SLIDE_UPDATE_FAIL, payload: message })
    toast.error(message)
  }
}

export const deleteSlideAction = (id) => async (dispatch, getState) => {
  dispatch({ type: SLIDE_DELETE_REQUEST })
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.delete(`/v1/slide/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: SLIDE_DELETE_SUCCESS, payload: data })
    dispatch(listSlides())
    toast.success('Xóa thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: SLIDE_DELETE_FAIL, payload: message })
    toast.error(message)
  }
};

export const detailSlideAction = (id) => async (dispatch, getState) => {
  dispatch({ type: SLIDE_DETAILS_REQUEST })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.get(`/v1/slide/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: SLIDE_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: SLIDE_DETAILS_FAIL, payload: message })
  }
};
