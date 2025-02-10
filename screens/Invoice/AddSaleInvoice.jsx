import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {typography} from '../../theme/typography';
import DropdownComponent from '../../components/common/DropdownText';
import TextField from '../../components/common/TextField';
import ButtonWithIcon from '../../components/common/ButtonWithIcon';
import {
  MATERIAL_TYPE,
  PRODUCT_DATA,
  TAX,
  taxRate,
} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addLineItem} from '../../redux/invoice/InvoiceSlice';

const AddLineItem = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [itemObj, setItemObj] = useState({
    productTitle: null,
    hsnCode: '',
    productDesc: null,
    orderNo: null,
    unitPrice: null,
    quantity: '',
    RATE: '',                                                                     
    totalAmount: '',
    taxRate: null,
    cgst: '',
    igst: '',
    sgst: '',
  });

  //   const addItem = async() => {
  //     dispatch(addLineItem(itemObj))
  //     const getPath = await AsyncStorage.getItem('path')
  // navigation.navigate(getPath)
  //   };

  const addItem = async () => {
    if (itemObj && typeof itemObj === 'object') {
      dispatch(addLineItem(itemObj));
      const getPath = await AsyncStorage.getItem('path');
      navigation.navigate(getPath);
    } else {
      console.error('Invalid item object:', itemObj);
    }
  };

  return (
    <ScrollView style={{backgrounproductDescolor: '#F7F7F7'}}>
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
        style={{backgrounproductDescolor: '#fff', paddingBottom: 10, marginBottom: 20}}>
        <View style={{zIndex: 1000}}>
          <DropdownComponent
            value={itemObj.productTitle}
            setValue={value => setItemObj(prev => ({...prev, productTitle: value}))}
            data={PRODUCT_DATA}
            title="Select Product"
            placeholder="Select Product"
          />
        </View>
        <View style={{marginTop: -30, zIndex: 1000}}>
          <TextField
            value={itemObj.hsnCode}
            setValue={value => setItemObj(prev => ({...prev, hsnCode: value}))}
            placeholder="Enter hsnCode/SAC"
            title="hsnCode/SAC"
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
            <TextField
              value={itemObj.productDesc}
              setValue={value => setItemObj(prev => ({...prev, productDesc: value}))}
              placeholder="Enter productDesc Number"
              title="productDesc Number"
            />
          </View>
          {/* Dropdown */}
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 75,
            }}>
            <TextField
              value={itemObj.orderNo}
              setValue={value => setItemObj(prev => ({...prev, orderNo: value}))}
              placeholder="Enter Order Number"
              title="Order Number"
            />
          </View>
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
              height: 60,
            }}>
            <DropdownComponent
              value={itemObj.unitPrice}
              setValue={value => setItemObj(prev => ({...prev, unitPrice: value}))}
              placeholder="Select Unit"
              data={MATERIAL_TYPE}
              title="Unit"
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 55,
            }}>
            <TextField
              value={itemObj.quantity}
              setValue={value => setItemObj(prev => ({...prev, quantity: value}))}
              title="Qty"
              placeholder="Enter Qty"
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
              value={itemObj.RATE}
              setValue={value => setItemObj(prev => ({...prev, RATE: value}))}
              title="Rate"
              placeholder="Enter Rate"
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
              value={itemObj.totalAmount}
              setValue={value => setItemObj(prev => ({...prev, totalAmount: value}))}
              title="Amt"
              placeholder="Enter Amt"
            />
          </View>
        </View>
      </View>

      <View
        style={{backgrounproductDescolor: '#fff', paddingBottom: 10, marginBottom: 10}}>
        <View
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          {/* Date and Time Picker */}
          <View
            style={{
              flex: 1,
              paddingRight: 5,
              height: 60,
            }}>
            <DropdownComponent
              value={itemObj.taxRate}
              setValue={value => setItemObj(prev => ({...prev, ta: value}))}
              placeholder="Tax"
              data={TAX}
              title="Tax"
            />
          </View>
          {/* Dropdown */}
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 55,
            }}>
            <TextField
              value={itemObj.CGST_RATE}
              setValue={value => setItemObj(prev => ({...prev, CGST_RATE: value}))}
              title="CGST_RATE"
              placeholder="CGST_RATE"
            />
          </View>
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
            <TextField
              value={itemObj.igst}
              setValue={value => setItemObj(prev => ({...prev, igst: value}))}
              placeholder="igst"
              title="igst"
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
              height: 75,
            }}>
            <TextField
              value={itemObj.SGST}
              setValue={value => setItemObj(prev => ({...prev, SGST: value}))}
              placeholder="SGST"
              title="SGST"
            />
          </View>
        </View>
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
          <ButtonWithIcon title="Cancel" color="#4894FE" onPress={addItem} />
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
            onPress={addItem}
          />
        </View>
      </View>
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
});

export default AddLineItem;
