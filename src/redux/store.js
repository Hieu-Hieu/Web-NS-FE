import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
    productListReducer, topProductsReducer, topProductsRelateReducer, productDetailReducer,
    productCreateReducer, productDeleteReducer, productUpdateReducer, producListtWithConditionReducer
} from './reducers/productReducer';
import { slideListReducer, addSlideReducer, updateSlideReducer, deleteSlideReducer, detailSlideReducer } from './reducers/slideReducer';
import {
    userSigninReducer, userListReducer, userDetailsReducer, userRegisterReducer,
    userFogotPasswordReducer, resetPassswordReducer, userUpdateProfileReducer
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryList, addCategoryReducer, updateCategoryReducer, deleteCategoryReducer, detailCategoryReducer } from './reducers/categoryReducers';
import { brandListReducer, brandCreateReducer, brandDeleteReducer, brandUpdateReducer, brandDetailReducer } from './reducers/brandReducer';
import { createOrderReducer, findUserOrderReducer, OrderDetailReducer, OrderListReducer, updateOrderReducer } from './reducers/orderReducer';
import { statisticAll, getRevenueByReducer, getTopCustomersReducer } from './reducers/statisticReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    }
};

const reducer = combineReducers({

    productList: productListReducer,
    productListWithContidion: producListtWithConditionReducer,
    productDetail: productDetailReducer,
    topProducts: topProductsReducer,
    topProductsRelate: topProductsRelateReducer,
    addProduct: productCreateReducer,
    updateProduct: productUpdateReducer,
    deleteProduct: productDeleteReducer,

    cart: cartReducer,

    userSignin: userSigninReducer,
    userList: userListReducer,
    userDetail: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    forgotPassword: userFogotPasswordReducer,
    resetPassword: resetPassswordReducer,

    categoriesList: categoryList,
    addCategory: addCategoryReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    detailCategory: detailCategoryReducer,

    brandsList: brandListReducer,
    addBrand: brandCreateReducer,
    updateBrand: brandUpdateReducer,
    deleteBrand: brandDeleteReducer,
    detailBrand: brandDetailReducer,

    slideList: slideListReducer,
    addSlide: addSlideReducer,
    updateSlide: updateSlideReducer,
    deleteSlide: deleteSlideReducer,
    detailSlide: detailSlideReducer,

    myOrders: findUserOrderReducer,
    orderList: OrderListReducer,
    updateOrder: updateOrderReducer,
    orderDetail: OrderDetailReducer,
    createOrder: createOrderReducer,

    statisticAll: statisticAll,
    revenueBy: getRevenueByReducer,
    topCustomers: getTopCustomersReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

