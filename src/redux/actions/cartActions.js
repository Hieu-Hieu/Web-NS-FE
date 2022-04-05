import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
import { toast } from 'react-toastify';

export const addToCart = (productId, qty) => async (dispatch, getState) => {

  const { data } = await Axios.get(`/v1/products/${productId}`);

  let quantity = qty;
  if (qty > data.qty) {
    toast.warning(`Trong kho chỉ còn ${data.qty} sản phẩm`);
    quantity = data.qty;
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.images,
        price: data.price,
        quantity,
        product: data._id,
      }
    })
  }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
};