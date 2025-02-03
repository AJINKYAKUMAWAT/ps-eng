/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  invoiceList: [],
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
  },
});

export const {setLoading, setInvoice} = invoiceSlice.actions;
export default invoiceSlice.reducer;

export const getInvoice =
  (axiosInstance,apiEndpoint,headers = {}) => async dispatch => {

    console.log("headers",headers)
    console.log("apiEndpoint",apiEndpoint)
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(apiEndpoint,{headers});
      console.log(response.data)
      // if (response.data?.success) {
      //   const result = isOrderLevel
      //     ? response.data?.data.order_lines
      //     : response.data?.data?.invoice_detail;

      //   // if (isOrderLevel && result) {
      //   //   const modifiedResult = result.map(item => {
      //   //     return {
      //   //       ...item,
      //   //       total_quantity: item.quantity,
      //   //       item_amount: item.item_final_amount * 100,
      //   //       part_image: item.part_cover_image,
      //   //     };
      //   //   });
      //   //   dispatch(setInvoice(result || []));
      //   // } else {
      //   dispatch(setInvoice(result || []));
      //   // }
      //   dispatch(setLoading(false));
      // } else {
      //   dispatch(setLoading(false));
      //   dispatch(setInvoice([]));
      // }
    } catch (err) {
      console.log('error for getting parts', err);
      dispatch(setLoading(false));
      dispatch(setInvoice([]));
    }
  };
