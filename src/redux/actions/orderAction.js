import Axios from 'axios';
import { toast } from 'react-toastify';
import { CART_RESET } from '../constants/cartConstants';
import {
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,

} from '../constants/orderConstants';

// danh sach don  hang da dat cua 1 user
export const myOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    }
  }
  const id = userInfo._id;
  try {
    const { data } = await Axios.get('/v1/order/myOrder/' + id, config);
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

const createOrder = (order) => async (dispatch, getState) => {
  console.log('lan 1')
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userSignin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await Axios.post('/v1/order',
      order, config
    );


    if (data) {
      // Axios.post('/v1/order/sendmail', { userInfo, cartItems: order.orderItems })
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data
      });

      await localStorage.setItem("cartItems", '');
      dispatch({ type: CART_RESET })
      console.log(data)
      if (data.paymentMethod === 'COD') {
        toast.success('Đặt hàng thành công');
      }
    }

  } catch (error) {
    console.log(error)
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    toast.error('Đặt hàng không thành công')
  }
};

export const orderDetail = (orderID) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const { userSignin: { userInfo } } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    }
  }
  try {
    const { data } = await Axios.get('/v1/order/' + orderID, config);
    console.log(data)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }

}

export const orderListAction = ({ pageNumber = 1, keyword = '' }) => async (dispatch, getState) => {

  dispatch({ type: ORDER_LIST_REQUEST });
  const { userSignin: { userInfo } } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    }
  }
  try {
    if (userInfo.role === 'user') {
      const { data } = await Axios.get('/v1/order', config);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.get(`/v1/order/admin?pageNumber=${pageNumber}&keyword=${keyword}`, config);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
      //console.log(data)
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const orderDelivery = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  // const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.get('/api/orders/shipper/DangGiao');
    console.log("data:" + data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};

export const updateStatusOrderAction = ({ id, status, pageNumber }) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await Axios.put('/v1/order/' + id, { status }, config);
    if (data) {
      dispatch({
        type: ORDER_UPDATE_SUCCESS,
        payload: data
      });
      let page = pageNumber || 1
      if (pageNumber) {
        dispatch(orderListAction({ pageNumber: page }))
      } else {
        dispatch(orderDetail(id))
      }
      toast.success('Cập nhật đơn hàng thành công')
    }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_UPDATE_FAIL, payload: message });
    toast.error(message);
  }
};

export const userUpdateOrderAction = ({ id, status }) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await Axios.put('/v1/order/myOrder/' + id, { status }, config);
    if (data) {
      dispatch({
        type: ORDER_UPDATE_SUCCESS,
        payload: data
      });
      dispatch(orderDetail(id))
      toast.success('Cập nhật đơn hàng thành công')
    }

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_UPDATE_FAIL, payload: message });
    toast.error(message);
  }
};


export const payOrder = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/v1/order/online-pay/${order._id}`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    dispatch(orderDetail(order._id));
    toast.success('Thanh toán thành công, Cảm ơn quý khách đã mua hàng!')

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};

export { createOrder };