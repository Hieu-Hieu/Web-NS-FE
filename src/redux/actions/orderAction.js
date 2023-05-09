import { toast } from "react-toastify";
import { CART_RESET } from "../constants/cartConstants";
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
} from "../constants/orderConstants";
import orderApi from "../../api/orderApi";

// danh sach don  hang da dat cua 1 user
export const myOrders = () => async (dispatch) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });

  try {
    const data = await orderApi.myOrders();
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  console.log("lan 1");
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const data = await orderApi.createOrder(order);
    if (data) {
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
      localStorage.setItem("cartItems", "");
      dispatch({ type: CART_RESET });
      console.log(data);
      if (data.paymentMethod === "COD") {
        toast.success("Đặt hàng thành công");
      }
    }
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
    toast.error("Đặt hàng không thành công");
    toast.error(message);
    console.log(error);
  }
};

export const orderDetail = (orderID) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });

  try {
    const data = await orderApi.getOrderDetail(orderID);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const orderListAction =
  ({ pageNumber = 1, keyword = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      let data = [];
      if (userInfo.role === "user") {
        data = await orderApi.getOrders("user");
      }
      data = await orderApi.getOrders("admin", pageNumber, keyword);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

// export const orderDelivery = () => async (dispatch, getState) => {
//   dispatch({ type: ORDER_LIST_REQUEST });

//   try {
//     const  data  = await Axios.get('/api/orders/shipper/DangGiao');
//     dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: ORDER_LIST_FAIL, payload: message });
//   }
// };

export const updateStatusOrderAction =
  ({ id, status, pageNumber }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_UPDATE_REQUEST });

      const data = await orderApi.updateOrderStatus(id, status);
      if (data) {
        dispatch({
          type: ORDER_UPDATE_SUCCESS,
          payload: data,
        });
        let page = pageNumber || 1;
        if (pageNumber) {
          dispatch(orderListAction({ pageNumber: page }));
        } else {
          dispatch(orderDetail(id));
        }
        toast.success("Cập nhật đơn hàng thành công");
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

export const userUpdateOrderAction =
  ({ id, status }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_UPDATE_REQUEST });

      const data = await orderApi.userUpdateOrderStatus(id, status);
      if (data) {
        dispatch({
          type: ORDER_UPDATE_SUCCESS,
          payload: data,
        });
        dispatch(orderDetail(id));
        toast.success("Cập nhật đơn hàng thành công");
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

export const payOrder = (order, paymentResult) => async (dispatch) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });

  try {
    const data = await orderApi.payOrder(order._id, paymentResult);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    dispatch(orderDetail(order._id));
    toast.success("Thanh toán thành công, Cảm ơn quý khách đã mua hàng!");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_PAY_FAIL, payload: message });
  }
};
