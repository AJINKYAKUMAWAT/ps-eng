/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import TableList from '../../components/common/TableList';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {typography} from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ControlModal from '../../components/common/Modal';
import {CONFIRMATION_MESSAGES, InvoiceListData} from '../../utils/constant';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {deleteInvoice, getInvoice} from '../../redux/invoice/InvoiceSlice';
import axiosInstance from '../../utils/axios';
import {Loader} from '../../AtomicComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const render = (expandedRows,item) => {
  return(
    <>    
      {/* Expandable Row */}
      {expandedRows[item.Sr] && (
        <View style={styles.collapsibleContent}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* Left Column */}
            <View style={{flex: 1, paddingRight: 10}}>
              <View style={styles.row}>
                <Text style={styles.label}>
                  GSTN <Text style={styles.value}>{item.GSTin}</Text>
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  Credit Period{' '}
                  <Text style={styles.value}>
                    {item.creditPeriod
                      ? `${item.creditPeriod} Days`
                      : 0}
                  </Text>
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Right Column */}
            <View style={{flex: 1}}>
              <View style={styles.row}>
                <Text style={styles.label}>Taxable ₹ : </Text>
                <Text style={styles.value}>
                  {item.totTaxableAmount}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>CGST (9%) : </Text>
                <Text style={styles.value}>{item.totCGST}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>SGST (9%) : </Text>
                <Text style={styles.value}>{item.totSGST}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>IGST (9%) : </Text>
                <Text style={styles.value}>{item.totIGST}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Grand Tot : </Text>
                <Text style={styles.value}>{item.grandTotal}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tot Received : </Text>
                <Text style={styles.value}>
                  {item.receivedAmount}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Balance : </Text>
                <Text style={styles.value}>{item.balanceAmount}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      </>
  )
}

const InvoiceList = () => {
  const {invoiceList, isLoading, total} = useSelector(state => state.invoice);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [queryParams, setQueryParams] = useState({
    order: 'ASC',
    limit: 10,
    orderPar: 'invoiceNo',
    currentPage: 1,
  });

  useEffect(() => {
    const params = {...queryParams};
    const headers = {
      xAction: 'getInvoice',
    };

    dispatch(getInvoice(axiosInstance, params, headers));
  }, [dispatch, queryParams]);

  const defaultColumns = useCallback(() => {
    return [
      {
        id: '1',
        title: 'Invoice',
        field: 'invoiceNo',
        data: row => <Text>{row.invoiceNo}</Text>, // Dynamically render cell content
        collapse: true,
        sortable:true
      },
      {
        id: '2',
        title: 'Date',
        field: 'invoiceDate',
        data: row => <Text>{row.invoiceDate}</Text>,
        sortable:true
      },
      {
        id: '3',
        title: 'Customer',
        field: 'custVendName',
        data: row => <Text>{row.custVendName}</Text>,
        sortable:true
      },
      {
        id: '4',
        title: 'Action',
        data: row => (
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        ),
      },
    ];
  }, []);

  const onEdit = async() => {
    await AsyncStorage.setItem('sr_id',1)
    navigation.navigate('Edit Sales Invoice');
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const onDelete = () => {
    try {
      const params = {...queryParams};
      const getHeaders = {
        xAction: 'getInvoice',
      };

      const headers = {
        xAction: 'trashData',
      };
      const payload = {
        id: [Number(id)],
        type: 'sale_invoice',
      };
      dispatch(deleteInvoice(axiosInstance, headers, payload));
      toast.show('Deleted Successfully', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
      dispatch(getInvoice(axiosInstance, params, getHeaders));
      setShowModal(false);

    } catch (error) {}
    setShowModal(false);
   
  };

  const columns = defaultColumns();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Invoices</Text>
        <TouchableOpacity
          style={styles.newInvoiceContainer}
          onPress={() => navigation.navigate('Add Sales Invoice')}>
          <Text style={styles.newInvoiceText}>New Invoices</Text>
          <Icon
            name="plus-circle"
            size={20}
            color="#4894FE"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header2}>
        <Text style={styles.breadcrumbText}>Home / Invoices</Text>
      </View>
      <TableList
      dynamicRows={InvoiceListData}
        loading={isLoading}
        data={invoiceList}
        setQueryParams={setQueryParams}
        queryParams={queryParams}
        total={total}
        columns={columns}
        enableSearch={true}
        pagination={true}
        onDelete={id => {
          setId(id);
          setShowModal(true);
        }}
        onPress={onEdit}
        rendor={render}
      />
      <ControlModal
        showModal={showModal}
        onCancel={onCancel}
        onPress={onDelete}
        confirmationMessage={CONFIRMATION_MESSAGES.INVOICE_DELETE}
      />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'right',
  },
  value: {
    color: '#4894FE',
    fontSize: 11,
    textAlign: 'left',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
    height: '100%',
    marginHorizontal: 10,
  },
  collapsibleContent: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default InvoiceList;
