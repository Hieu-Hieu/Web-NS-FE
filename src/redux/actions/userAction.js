import { toast } from "react-toastify";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_FOGOT_PASSWORD_REQUEST,
  USER_FOGOT_PASSWORD_SUCCESS,
  USER_FOGOT_PASSWORD_FAIL,
} from "../constants/userConstansts";
import userApi from "../../api/userApi";

export const userLoginAction = (data) => async (dispatch) => {
  const { email, password, token, ggId } = data;

  dispatch({ type: USER_SIGNIN_REQUEST, payload: email });
  try {
    if (token && ggId) {
      const data = await userApi.googleLogin(token, ggId);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      const data = await userApi.loginWithPassword(email, password);
      console.log(data);
      if (data?.status === false) {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: data.message || "Đăng nhập thất bại",
        });
        return;
      }
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogOutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/";
};

export const listUserAction =
  ({ pageNumber = 1, keyword = "" }) =>
  async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });

    try {
      const data = await userApi.getAllUsers(pageNumber, keyword);
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailsUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  try {
    const data = await userApi.getUserById(userId);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });
  try {
    const data = await userApi.deleteUser(userId);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

export const register = (userInfo) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const data = await userApi.register(userInfo);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });

  try {
    const data = await userApi.updateProfile(user);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(detailsUser(user._id));
    dispatch({ type: USER_SIGNIN_SUCCESS });

    toast.success("Cập nhật thành công");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    toast.error(error);
  }
};

export const resetPassword = (value) => async (dispatch) => {
  dispatch({ type: USER_RESET_PASSWORD_REQUEST });
  try {
    const data = await userApi.resetPassword(value);

    dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fogotPassword =
  ({ email }) =>
  async (dispatch) => {
    dispatch({ type: USER_FOGOT_PASSWORD_REQUEST });
    try {
      const data = await userApi.fogotPassword(email);
      dispatch({ type: USER_FOGOT_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_FOGOT_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
