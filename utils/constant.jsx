import axios from "axios";

export const BASE_URL = 'https://psengg.gstinvoice.in/'

export const API_ENDPOINT = {
    LOGIN:'xadmin/api/',
    LOGGEDIN_USER:''
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
    title: 'title',
    calories: 'calories',
    fat: 'fat',
  }
  