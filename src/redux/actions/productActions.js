import Axios from 'axios';
import { toast } from 'react-toastify';
import {
  PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_FAIL,
  TOP_PRODUCTS_FAIL, TOP_PRODUCTS_REQUEST, TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_RELATE_REQUEST, TOP_PRODUCTS_RELATE_SUCCESS, TOP_PRODUCTS_RELATE_FAIL,
  PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_REQUEST,
  PRODUCT_LIST_WITH_CONDITION_FAIL, PRODUCT_LIST_WITH_CONDITION_REQUEST, PRODUCT_LIST_WITH_CONDITION_SUCCESS,
} from '../constants/productConstants';

export const listProducts = ({
  pageNumber = '',
  name = '',
  category = '',
  certificate = '',
  min = '',
  max = '',
  brand = '',
}) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/v1/products?pageNumber=${pageNumber}&name=${name}&category=${category}&certificate=${certificate}&min=${min}&max=${max}&brand=${brand}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const listProductsWithCondition = ({
  pageNumber = '',
  name = '',
  category = '',
  certificate = '',
  min = '',
  max = '',
}) => async (dispatch) => {

  dispatch({
    type: PRODUCT_LIST_WITH_CONDITION_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/v1/products?pageNumber=${pageNumber}&name=${name}&category=${category}&certificate=${certificate}&min=${min}&max=${max}`
    );
    dispatch({ type: PRODUCT_LIST_WITH_CONDITION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_WITH_CONDITION_FAIL, payload: error.message });
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  try {
    const { data } = await Axios.get(`/v1/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const topProductAction = () => async (dispatch) => {

  dispatch({ type: TOP_PRODUCTS_REQUEST });

  try {
    const { data } = await Axios.get('v1/products/top-product');
    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: TOP_PRODUCTS_FAIL, payload: error.message })
  }
}

export const topProductsRelate = (productId) => async (dispatch) => {

  dispatch({ type: TOP_PRODUCTS_RELATE_REQUEST });

  try {
    const { data } = await Axios.get(`/v1/products/product-related/${productId}`);
    dispatch({ type: TOP_PRODUCTS_RELATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: TOP_PRODUCTS_RELATE_FAIL, payload: error.message })
  }
};

export const listProductsAdmin = ({
  pageNumber = 1,
  keyword
}
) => async (dispatch, getState) => {
  console.log(keyword)
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    }
  }
  try {
    const { data } = await Axios.get(
      `/v1/products/admin/search?pageNumber=${pageNumber}&keyword=${keyword}`, config
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const addProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.post('/v1/products', product, config)

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    toast.success('Thêm sản phẩm thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message })
    toast.error(message)
  }
};

export const updateProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.put(`/v1/products/${product._id}`, product, config)

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    toast.success('Cập nhật sản phẩm thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message })
    toast.error(message);
  }
};

export const deleteProductAction = (id, pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await Axios.delete(`/v1/products/${id}`, config)

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
    dispatch(listProductsAdmin({
      pageNumber
    }));
    toast.success('Xóa thành công')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message })
    toast.error(message);
  }
}
