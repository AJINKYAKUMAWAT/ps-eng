/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  invoiceList: [],
  total:0,
  isLoading: false,
  customer:null,
  material:null,
  itemList:[]
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {...state, isLoading: action.payload};
    },
    setInvoice: (state, action) => {
      return {...state, invoiceList: action.payload};
    },
    setCustomer: (state, action) => {
      return {...state, customer: action.payload};
    },
    setMaterial: (state, action) => {
      return {...state, material: action.payload};
    },
    setItem: (state, action) => {
      return { ...state, itemList: Array.isArray(state.itemList) ? [...state.itemList, action.payload] : [action.payload] };
    },
    setTotal: (state, action) => {
      return {...state, total: action.payload};
    },
  },
});

export const {setLoading, setInvoice,setTotal,setCustomer,setMaterial,setItem} = invoiceSlice.actions;
export default invoiceSlice.reducer;

export const getInvoice =
  (axiosInstance,params = {},headers = {}) => async dispatch => {


    const queryString = new URLSearchParams(params).toString();

    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.get(`?${queryString}`,{headers});
      dispatch(setInvoice(response.data.data));
      dispatch(setTotal(response.data.totalCount || 0))
      dispatch(setLoading(false));
    } catch (err) {
      console.log('error for getting Invoice', err);
      dispatch(setLoading(false));
    }
  };

  export const getCustomer =
  (axiosInstance, headers = {}) => async dispatch => {
    try {
      const response = await axiosInstance.get(
        '/', 
        { headers }
      );
      dispatch(setCustomer(response.data.data));
    } catch (err) {
      console.log('error for getting Customer', err);
    }
  };

  export const getMaterial =
  (axiosInstance, headers = {}) => async dispatch => {
    try {
      const response = await axiosInstance.get(
        '/', 
        { headers }
      );
      dispatch(setMaterial(response.data.data));
    } catch (err) {
      console.log('error for getting Material', err);
    }
  };

  export const deleteInvoice =
  (axiosInstance, headers = {}, payload = {}) => async dispatch => {

    try {
      const response = await axiosInstance.post(
        '/', 
        payload, 
        { headers }
      );

      return response.data;

    } catch (err) {
      console.log('Error deleting invoice:', err.response?.data || err.message);
    }
  };

  export const addInvoice =
  (axiosInstance, headers = {}, payload = {}) => async dispatch => {
    try {
      const response = await axiosInstance.post(
        '/', 
        payload, 
        { headers }
      );

      return response.data;

    } catch (err) {
      console.log('Error add invoice:', err.response?.data || err.message);
    }
  };

  export const addLineItem =
  (item) => async dispatch => {
    try {
      dispatch(setItem(item))

    } catch (err) {
      console.log('Error add Item:', err.response?.data || err.message);
    }
  };
