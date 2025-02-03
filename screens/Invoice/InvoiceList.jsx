/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import TableList from '../../components/common/TableList';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { typography } from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ControlModal from '../../components/common/Modal';
import { API_ENDPOINT, CONFIRMATION_MESSAGES } from '../../utils/constant';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';
import { getInvoice } from '../../redux/invoice/InvoiceSlice';
import axiosInstance from '../../utils/axios';

const data = [
  {
    key: 1,
    title: 'Cupcake',
    calories: 356,
    fat: 16,
    details: 'Delicious cupcake with vanilla frosting.',
  },
  {
    key: 2,
    title: 'Eclair',
    calories: 262,
    fat: 16,
    details: 'Chocolate-filled eclair with rich cream.',
  },
  {
    key: 3,
    title: 'Frozen yogurt',
    calories: 159,
    fat: 6,
    details: 'Low-fat frozen yogurt, perfect for summer.',
  },
  {
    key: 4,
    title: 'Gingerbread',
    calories: 305,
    fat: 3.7,
    details: 'Classic gingerbread with a spicy touch.',
  },
];

const InvoiceList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const headers = {
      xAction:'getInvoice'
    }
    dispatch(getInvoice(axiosInstance,API_ENDPOINT.INVOICE_LIST,headers));
  }, [dispatch]);

  const defaultColumns = useCallback((data) => {
    return [
      {
        id: '1',
        title: 'Dessert',
        data: data.map((i) => <Text key={i.key}>{i.title}</Text>),
        collapse: true,
      },
      {
        id: '2',
        title: 'Calories',
        data: data.map((i) => <Text key={i.key}>{i.calories}</Text>),
      },
      {
        id: '3',
        title: 'Fat',
        data: data.map((i) => <Text key={i.key}>{i.fat}</Text>),
      },
      {
        id: '4',
        title: 'Action',
        data: data.map((i) => (
          <TouchableOpacity key={i.key} onPress={() => setShowModal(true)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )),
      },
    ];
  }, []);

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

  const columns = defaultColumns(data);

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
      <TableList data={data} columns={columns} enableSearch={true} onDelete={() => setShowModal(true)} onPress={onEdit} />
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
