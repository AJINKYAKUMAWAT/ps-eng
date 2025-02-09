/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import axios from "axios";

export const BASE_URL = 'https://devproject.co.in/psengg/xadmin/api'

export const API_ENDPOINT = {
    LOGIN:'xadmin/api/',
    LOGGEDIN_USER:'',
    INVOICE_LIST:'?order=ASC&limit=20&orderPar=invoiceNo&currentPage=1'
}

export const ERROR_MESSAGES = {
    SOMETHING_WENT_WRONG:'Something went wrong. Please try again later.'
}

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', source: 'mobile_application' },
    withCredentials: true,
  });

  export const InvoiceListData={
    invoiceNo: 'invoiceNo',
    invoiceDate: 'invoiceDate',
    custVendName: 'custVendName',
  }
  
  export const AddInvoiceListData={
    productTitle: 'productTitle',
    hsnCode: 'hsnCode',
    orderNo: 'orderNo',
  }


  export const CUSTOMER_DATA = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  export const MATERIAL_TYPE = [
    {label: 'Without Material', value: '1'},
    {label: 'With Material', value: '2'},
  ];

  export const TAX = [
    {label: '18%', value: '1'},
    {label: '20%', value: '2'},
  ];

  export const CONFIRMATION_MESSAGES = {
    INVOICE_DELETE: 'Are you sure want to delete invoice ?',
    LINE_ITEM_DELETE: 'Are you sure want to delete line item ?'
  }

  export const DELETED_MESSAGES = {
    INVOICE_DELETE: 'Invoice deleted successfully',
    LINE_ITEM_DELETE: 'Line item deleted successfully'
  }

  export const PRODUCT_DATA = [
    {label: 'IT 3684A - SPECIALBEARING OUTER', value: '1'},
    {label: 'IT 3684B - SPECIALBEARING INNER', value: '2'},
    {label: 'IT 300A - SPECIALBEARING', value: '3'},
    {label: 'IT 3688A - SPECIALBEARING-NEW OUTER', value: '4'},
  ];