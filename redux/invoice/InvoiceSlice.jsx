/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  invoiceList: [],
  total:0,
  isLoading: false,
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
    setTotal: (state, action) => {
      return {...state, total: action.payload};
    },
  },
});

export const {setLoading, setInvoice,setTotal} = invoiceSlice.actions;
export default invoiceSlice.reducer;

export const getInvoice =
  (axiosInstance,params = {},headers = {}) => async dispatch => {


    const queryString = new URLSearchParams(params).toString();

    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`?${queryString}`,{headers});
      dispatch(setInvoice(response.data.data || []));
      dispatch(setTotal(response.data.totalCount || 0))

    } catch (err) {
      console.log('error for getting parts', err);
      dispatch(setLoading(false));
      dispatch(setInvoice([]));
    }
  };
