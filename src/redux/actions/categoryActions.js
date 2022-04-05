import Axios from 'axios';
import { toast } from 'react-toastify';
import {
  CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, CATEGORY_LIST_FAIL,
  CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL,
  CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL,
  CATEGORY_DETAILS_FAIL, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_REQUEST,

} from "../constants/categoryConstants";

export const categoryAction = () => async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });

  try {
    const { data } = await Axios.get('/v1/category');
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_LIST_FAIL, payload: message })
  }
}

export const listCategoriesAdmin = () => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await Axios.get('/v1/category/admin', { headers: { Authorization: `Bearer ${userInfo.token}` } });
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_LIST_FAIL, payload: message })
  }
}

export const addCategoryAction = (category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_ADD_REQUEST })
  const {
    userSignin: { userInfo }
  } = getState();

  try {
    const { data } = await Axios.post('/v1/category', category, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({ type: CATEGORY_ADD_SUCCESS, payload: data })
    toast.success('Thêm thành công')
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CATEGORY_ADD_FAIL, payload: message })
    toast.error(error)
  }
}

export const updateCategoryAction = (category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.put(`/v1/category/${category._id}`, category, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data })
    toast.success('Cập nhật thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CATEGORY_UPDATE_FAIL, payload: message })
    toast.error('Cập nhật thất bại')
  }
}

export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_DELETE_REQUEST })
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.delete(`/v1/category/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    })
    dispatch({ type: CATEGORY_DELETE_SUCCESS })
    dispatch(categoryAction())
    toast.success('Xóa thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CATEGORY_DELETE_FAIL, payload: message })
    toast.error(error)
  }
};

export const detailCategoryAction = (id) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_DETAILS_REQUEST })
  const {
    userSignin: { userInfo }
  } = getState()
  try {
    const { data } = await Axios.get(`/v1/category/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: message })
  }
};