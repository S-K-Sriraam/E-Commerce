import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import {
  userSignupReducer,
  userLoginReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderDeliverReducer,
  orderListReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";

import { cartReducers } from "./reducers/cartReducers";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducers,
  productUpdateReducers,
  productDeleteReducers,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  productDelete: productDeleteReducers,

  userSignup: userSignupReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  cart: cartReducers, // ✅ REQUIRED

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderMyList: orderListMyReducer,
});

// ---------- LOCAL STORAGE ----------
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// ---------- INITIAL STATE ----------
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage, // ✅ FIX
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
