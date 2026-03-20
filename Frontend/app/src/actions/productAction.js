// src/actions/productAction.js
import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants"; // ensure this file exists at src/constants/productConstants.js

import localProducts from "../products"; // optional fallback; your products.js currently is empty — add sample items if you want fallback.

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; // change if backend is elsewhere

// fetch all products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const url = `${API_BASE}/api/products`;
    console.log("[ACTION] Requesting product list:", url);
    const { data } = await axios.get(url);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.error(
      "[ACTION] Product list error:",
      error?.response || error?.message
    );

    if (Array.isArray(localProducts) && localProducts.length) {
      console.warn("[ACTION] Falling back to localProducts");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: localProducts });
      return;
    }

    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

// fetch single product by id
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const url = `${API_BASE}/api/products/${id}`;
    console.log(`[ACTION] Requesting product details: ${url} (id=${id})`);
    const { data } = await axios.get(url);
    console.log("[ACTION] Product detail response:", data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.error(
      "[ACTION] Product detail error:",
      error?.response || error?.message
    );

    // local fallback by matching _id or id
    const fallback = (localProducts || []).find(
      (p) => `${p._id ?? p.id}` === `${id}`
    );
    if (fallback) {
      console.warn("[ACTION] Using local fallback for product id:", id);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: fallback });
      return;
    }

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create`, {}, config);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch ({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/update/${product._id}`, product, config);
    dispatch ({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  }

  catch(error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch ({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}`, config);
    dispatch ({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  }

  catch(error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}
