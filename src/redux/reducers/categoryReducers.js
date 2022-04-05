
import {
  CATEGORY_LIST_SUCCESS, CATEGORY_LIST_REQUEST, CATEGORY_LIST_FAIL,
  CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL, CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL,

} from "../constants/categoryConstants";

export const categoryList = (state = { loading: true, categories: [] }, action) => {

  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true }
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading: true }
    case CATEGORY_ADD_SUCCESS:
      return { loading: false, success: true, category: action.payload }
    case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const updateCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true, category: action.payload }
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true, category: action.payload }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const detailCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true, category: action.payload }
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};



