import * as c from '../constants/brandConstants'

export const brandDetailReducer = (state = { loading: true, brand: {} }, action) => {
  switch (action.type) {
    case c.BRAND_DETAILS_REQUEST:
      return { loading: true }
    case c.BRAND_DETAILS_SUCCESS:
      return { loading: false, brand: action.payload }
    case c.BRAND_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case c.BRAND_CREATE_REQUEST:
      return { loading: true };
    case c.BRAND_CREATE_SUCCESS:
      console.log(action.payload)
      return { loading: false, success: true, brand: action.payload };
    case c.BRAND_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case c.BRAND_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const brandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case c.BRAND_UPDATE_REQUEST:
      return { loading: true };
    case c.BRAND_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case c.BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case c.BRAND_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case c.BRAND_DELETE_REQUEST:
      return { loading: true };
    case c.BRAND_DELETE_SUCCESS:
      return { loading: false, success: true };
    case c.BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case c.BRAND_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


export const brandListReducer = (
  state = { loading: true, brands: [] },
  action
) => {
  switch (action.type) {
    case c.BRAND_LIST_REQUEST:
      return { loading: true };
    case c.BRAND_LIST_SUCCESS:
      console.log(action.payload)
      return {
        loading: false,
        brands: action.payload,
      };
    case c.BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
