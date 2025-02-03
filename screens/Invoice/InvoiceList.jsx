/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import TableList from '../../components/common/TableList';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ControlModal from '../../components/common/Modal';
import {  CONFIRMATION_MESSAGES } from '../../utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoice } from '../../redux/invoice/InvoiceSlice';
import axiosInstance from '../../utils/axios';

const InvoiceList = () => {
  const {invoiceList,total} = useSelector(state => state.invoice)
  const dispatch = useDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [queryParams,setQueryParams] = useState({
    order: 'ASC',
    limit: 10,
    orderPar: 'invoiceNo',
    currentPage: 1,
  })

  useEffect(() => {
    const params = {...queryParams}
    const headers = {
      xAction: 'getInvoice',
    };

    console.log("queryParams",params)
  
    dispatch(getInvoice(axiosInstance,params, headers));
  }, [dispatch,queryParams]);

  

  const defaultColumns = useCallback(() => {
    return [
      {
        id: '1',
        title: 'Invoice',
        field:'invoiceNo',
        data: (row) => <Text>{row.invoiceNo}</Text>, // Dynamically render cell content
        collapse: true,
      },
      {
        id: '2',
        title: 'Date',
        field:'invoiceDate',
        data: (row) => <Text>{row.invoiceDate}</Text>,
      },
      {
        id: '3',
        title: 'Customer',
        field:'custVendName',
        data: (row) => <Text>{row.custVendName}</Text>,
      },
      {
        id: '4',
        title: 'Action',
        data: (row) => (
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        ),
      },
    ];
  }, []);;

  const onEdit = () => {
    navigation.navigate('Edit Sales Invoice');
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const onDelete = () => {
    setShowModal(false);
    toast.show('Deleted Successfully', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      animationType: 'slide-in',
    });
  };

  const columns = defaultColumns();


  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <TouchableOpacity
          style={styles.newInvoiceContainer}
          onPress={() => navigation.navigate('Add Sales Invoice')}
        >
          <Text style={styles.newInvoiceText}>New Invoices</Text>
          <Icon name="plus-circle" size={20} color="#4894FE" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.header2}>
        <Text style={styles.breadcrumbText}>Home / Invoices</Text>
      </View>
      <TableList data={invoiceList} setQueryParams={setQueryParams} queryParams={queryParams} total={total} columns={columns} enableSearch={true} onDelete={() => setShowModal(true)} onPress={onEdit} />
      <ControlModal showModal={showModal} onCancel={onCancel} onPress={onDelete} confirmationMessage={CONFIRMATION_MESSAGES.INVOICE_DELETE} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header2: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  title: {
    color: '#303841',
    fontSize: 25,
    fontFamily: typography.primary,
  },
  newInvoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newInvoiceText: {
    color: '#4894FE',
    fontSize: 15,
    fontFamily: typography.boldPoppins,
    marginRight: 5,
    textDecorationLine: 'underline',
  },
  icon: {
    marginTop: 2,
  },
  breadcrumbText: {
    color: '#4894FE',
    fontFamily: typography.boldPoppins,
  },
  deleteText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

export default InvoiceList;
