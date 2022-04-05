import * as S from '../constants/statistic.constants'

export const statisticAll = (state = {}, action) => {

  switch (action.type) {
    case S.ORDER_SUMMARY_TOTAL_REQUEST:
      return { loading: true }
    case S.ORDER_SUMMARY_TOTAL_SUCCESS:
      console.log(action.payload)
      return { loading: false, summary: action.payload }
    case S.ORDER_SUMMARY_TOTAL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const getTopCustomersReducer = (state = [], action) => {

  switch (action.type) {
    case S.TOP_CUSTOMER_REQUEST:
      return { loading: true }
    case S.TOP_CUSTOMER_SUCCESS:
      return { loading: false, customers: action.payload }
    case S.TOP_CUSTOMER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

export const getRevenueByReducer = (state = [], action) => {

  switch (action.type) {
    case S.ORDER_SUMMARY_REQUEST:
      return { loading: true }
    case S.ORDER_SUMMARY_SUCCESS:
      console.log(action.payload)
      return { loading: false, revenue: action.payload }
    case S.ORDER_SUMMARY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};

