import {
  SLIDE_CREATE_FAIL, SLIDE_CREATE_REQUEST, SLIDE_CREATE_SUCCESS,
  SLIDE_DELETE_FAIL, SLIDE_DELETE_REQUEST, SLIDE_DELETE_SUCCESS,
  SLIDE_DETAILS_FAIL, SLIDE_DETAILS_REQUEST, SLIDE_DETAILS_SUCCESS,
  SLIDE_LIST_FAIL, SLIDE_LIST_REQUEST, SLIDE_LIST_SUCCESS,
  SLIDE_UPDATE_FAIL, SLIDE_UPDATE_REQUEST, SLIDE_UPDATE_SUCCESS
} from "../constants/slideConstants";

export const slideListReducer = (
  state = { loading: true, slides: [] },
  action
) => {
  switch (action.type) {
    case SLIDE_LIST_REQUEST:
      return { loading: true }
    case SLIDE_LIST_SUCCESS:
      return {
        loading: false,
        slides: action.payload
      }
    case SLIDE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
};

export const addSlideReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_CREATE_REQUEST:
      return { loading: true }
    case SLIDE_CREATE_SUCCESS:
      return { loading: false, success: true, slide: action.payload }
    case SLIDE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const updateSlideReducer = (state = { slide: {} }, action) => {
  switch (action.type) {
    case SLIDE_UPDATE_REQUEST:
      return { loading: true, slide: action.payload }
    case SLIDE_UPDATE_SUCCESS:
      return { loading: false, success: true, slide: action.payload }
    case SLIDE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const deleteSlideReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_DELETE_REQUEST:
      return { loading: true, slide: action.payload }
    case SLIDE_DELETE_SUCCESS:
      return { loading: false, success: true, slide: action.payload }
    case SLIDE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const detailSlideReducer = (state = {}, action) => {
  switch (action.type) {
    case SLIDE_DETAILS_REQUEST:
      return { loading: true, slide: action.payload }
    case SLIDE_DETAILS_SUCCESS:
      return { loading: false, slide: action.payload }
    case SLIDE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};