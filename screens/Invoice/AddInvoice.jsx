import React, {useCallback, useEffect, useState} from 'react';
import TableList from '../../components/common/TableList';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {typography} from '../../theme/typography';
import DropdownComponent from '../../components/common/DropdownText';
import TextField from '../../components/common/TextField';
import MyDatePicker from '../../components/common/Datepicker';
import DateAndTimePicker from '../../components/common/DateAndTimepicker';
import ButtonWithIcon from '../../components/common/ButtonWithIcon';
import {AddInvoiceListData, CONFIRMATION_MESSAGES} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import ControlModal from '../../components/common/Modal';
import dayjs from 'dayjs';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {
  addInvoice,
  getCustomer,
  getInvoice,
  getMaterial,
} from '../../redux/invoice/InvoiceSlice';
import axiosInstance from '../../utils/axios';

const render = (expandedRows,item) => {
  return(
    <>    
      {expandedRows[item.Sr] && (
        <View style={styles.collapsibleContent}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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


const AddInvoice = () => {
  const {invoiceList, isLoading, total, customer, material,itemList} = useSelector(
    state => state.invoice,
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const [itemObj, setItemObj] = useState({
    customer: null,
    invoiceDate: null,
    date: null,
    time: null,
    materialType: null,
    creditPeriod: '',
    storeCode: '',
  });
  const [error, setError] = useState(false);

  const [queryParams, setQueryParams] = useState({
    order: 'ASC',
    limit: 10,
    orderPar: 'Sr',
    currentPage: 1,
  });

  useEffect(() => {
    dispatch(getCustomer(axiosInstance, {xAction: 'customerDropdownData'}));
    dispatch(getMaterial(axiosInstance, {xAction: 'materialTypeDropdownData'}));
    dispatch(
      getInvoice(
        axiosInstance,
        {...queryParams, currentPage: 1, Sr: 30},
        {xAction: 'getInvoice'},
      ),
    );
  }, [dispatch, queryParams]);

  const defaultColumns = useCallback(() => {
    return [
      {
        id: '1',
        title: 'Sr. Product',
        field: 'productTitle',
        data: row => <Text>{row.productTitle}</Text>, // Dynamically render cell content
        collapse: true,
      },
      {
        id: '2',
        title: 'HSN/SAC',
        field: 'hsnCode',
        data: row => <Text>{row.hsnCode}</Text>,
      },
      {
        id: '3',
        title: 'Order No.',
        field: 'orderNo',
        data: row => <Text>{row.orderNo}</Text>,
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

  const columns = defaultColumns();

  const addItem = async () => {
    await AsyncStorage.setItem('path', route.name);
    navigation.navigate('Add Line Item');
  };

  console.log("itemList",itemList)

  const onSubmit = () => {
    if (!itemObj.customer || !itemObj.materialType) {
      setError(true);
    } else {
      try {
        const headers = {
          xAction: 'addInvoice',
        };
        const payload = {
          custVendID: Number(itemObj.customer),
          saleInvoiceNo: 'IN/PS/24-25/268',
          invoiceDate: dayjs(itemObj.invoiceDate).format('YYYY-MM-DD'),
          dateTimeOfSupply: `${dayjs(itemObj.date).format('YYYY-MM-DD')} ${dayjs(itemObj.time).format('HH:mm:ss')}`,
          isMatrialType: Number(itemObj.materialType),
          creditPeriod: itemObj.creditPeriod,
          storeCode: itemObj.storeCode,
          product: [
            {
              productID: 110,
              productDesc: 'product 1 Desc',
              hsnCode: '1234',
              challanNo: '1234',
              thirdPartyOrderNo: '1234',
              unitID: 3,
              quantity: 100,
              unitPrice: 250,
              amount: 25000.0,
              taxID: 9,
              taxRate: 12.0,
              CGST_RATE: 12.0,
              SGST_RATE: 12.0,
              cgst: 1500.0,
              sgst: 1500.0,
              igst: 0.0,
              totAmt: 28000.0,
            },
          ],
        };
        dispatch(addInvoice(axiosInstance, headers, payload));
        toast.show('Added Successfully', {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      } catch (error) {}
    }
    // navigation.navigate('Sales Invoice');
  };

  const onPress = async () => {
    await AsyncStorage.setItem('path', route.name);
    navigation.navigate('Edit Line Item');
  };

  const CUSTOMER_DATA = customer
    ? Object.entries(customer).map(([key, value]) => ({
        label: value?.trim(),
        value: key,
      }))
    : [];

  const MATERIAL_TYPE = material
    ? Object.entries(material).map(([key, value]) => ({
        label: value?.trim(),
        value: key,
      }))
    : [];

  const onCancel = () => {
    setShowModal(false);
  };

  const onDelete = () => {
    setShowModal(false);
    toast.show('Delete Successfully', {
      data: {
        type: 'success',
        message: 'Delete Successfully',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      },
    });
  };

  const onEdit = () => {};

  return (
    <ScrollView style={{backgroundColor: '#F7F7F7'}}>
      <View style={styles.header1}>
        <Text style={{color: '#4894FE', fontFamily: typography.boldPoppins}}>
          Home/Invoices/Edit
        </Text>
      </View>
      <View style={styles.header2}>
        <Text
          style={{
            color: '#000',
            fontFamily: typography.primary,
            marginRight: 10,
          }}>
          Invoice No
        </Text>
        <Text style={{color: '#4894FE', fontFamily: typography.boldPoppins}}>
          IN/PS/24-25/261
        </Text>
      </View>
      <View
        style={{backgroundColor: '#fff', paddingBottom: 30, marginBottom: 10}}>
        <View style={{zIndex: 1000}}>
          <DropdownComponent
            value={itemObj.customer}
            setValue={value => setItemObj(prev => ({...prev, customer: value}))}
            required
            error={error}
            data={CUSTOMER_DATA}
            title="Select Customer"
            ErrorMessages="This field is required"
            placeholder="Select Customer"
          />
        </View>
        <View style={{marginTop: -30, zIndex: 1000}}>
          <MyDatePicker
            title="Sale Invoice Date"
            date={itemObj.invoiceDate}
            error={error}
            setDate={value =>
              setItemObj(prev => ({...prev, invoiceDate: value}))
            }
            ErrorMessages="This field is required"
          />
        </View>
        <View
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* Date and Time Picker */}
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <DateAndTimePicker
              error={error}
              date={itemObj.date}
              setDate={value => setItemObj(prev => ({...prev, date: value}))}
              time={itemObj.time}
              setTime={value => setItemObj(prev => ({...prev, time: value}))}
              title="Date & Time of supply"
              ErrorMessages="This field is required"
            />
          </View>
          {/* Dropdown */}
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 80,
            }}>
            <DropdownComponent
              value={itemObj.materialType}
              setValue={value =>
                setItemObj(prev => ({...prev, materialType: value}))
              }
              placeholder="Select Material"
              error={error}
              required
              data={MATERIAL_TYPE}
              title="Material Type"
              ErrorMessages="This field is required"
            />
          </View>
        </View>
        <View
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {/* Date and Time Picker */}
          <View
            style={{
              flex: 1,
              paddingRight: 5,
              height: 80,
            }}>
            <TextField
              value={itemObj.creditPeriod}
              setValue={value =>
                setItemObj(prev => ({...prev, creditPeriod: value}))
              }
              placeholder="Enter Credit Period"
              error={error}
              title="Credit Period (In Days)"
              ErrorMessages="This field is required"
            />
          </View>
          {/* Dropdown */}
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 80,
            }}>
            <TextField
              error={error}
              value={itemObj.storeCode}
              setValue={value =>
                setItemObj(prev => ({...prev, storeCode: value}))
              }
              title="Store Code"
              placeholder="Enter Store Code"
              ErrorMessages="This field is required"
            />
          </View>
        </View>
      </View>

      <View style={{padding: 10, backgroundColor: '#fff', marginBottom: 10}}>
        <ButtonWithIcon
          title="Add Line Item"
          icon="plus"
          color="#4894FE"
          onPress={addItem}
        />
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <TableList
          dynamicRows={AddInvoiceListData}
          loading={isLoading}
          data={invoiceList[0]?.productData || []}
          subData={invoiceList}
          setQueryParams={setQueryParams}
          queryParams={queryParams}
          total={total}
          columns={columns}
          enableSearch={true}
          onDelete={id => {
            setId(id);
            setShowModal(true);
          }}
          onPress={onEdit}
          rendor={render}
        />
      </View>

      <View
        style={{
          zIndex: 1000,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
        }}>
        {/* Date and Time Picker */}
        <View
          style={{
            flex: 1,
            paddingRight: 5,
          }}>
          <ButtonWithIcon title="Cancel" color="#4894FE" onPress={onSubmit} />
        </View>
        {/* Dropdown */}
        <View
          style={{
            flex: 1,
            paddingLeft: 5,
          }}>
          <ButtonWithIcon
            title="Save"
            background="#4894FE"
            color="#fff"
            onPress={onSubmit}
          />
        </View>
      </View>
      <ControlModal
        onCancel={onCancel}
        showModal={showModal}
        onPress={onDelete}
        CONFIRMATION_MESSAGES={CONFIRMATION_MESSAGES.LINE_ITEM_DELETE}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header1: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header2: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 5, // Add space between text and icon
    textDecorationLine: 'underline', // Adds underline
  },
  icon: {
    marginTop: 2, // Adjust the alignment to center the icon vertically
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

export default AddInvoice;
