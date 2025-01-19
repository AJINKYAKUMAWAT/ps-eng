import React, {useCallback, useMemo, useState} from 'react';
import TableList from '../../components/common/TableList';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {typography} from '../../theme/typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from '../../components/common/DropdownText';
import TextField from '../../components/common/TextField';
import MyDatePicker from '../../components/common/Datepicker';
import DateAndTimePicker from '../../components/common/DateAndTimepicker';
import Button from '../../AtomicComponents/Button';
import ButtonWithIcon from '../../components/common/ButtonWithIcon';
import {CUSTOMER_DATA, MATERIAL_TYPE, PRODUCT_DATA, TAX} from '../../utils/constant';

const AddLineItem = () => {
  const [itemObj, setItemObj] = useState({
    PRODUCT: null,
    HSN: '',
    DC: null,
    ORDER: null,
    UNIT: null,
    QTY: '',
    RATE: '',
    AMT: '',
    TAX: null,
    CGST: '',
    IGST: '',
    SGST: '',
  });
  const [error, setError] = useState(false);

  const addItem = () => {

  };

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
        style={{backgroundColor: '#fff', paddingBottom: 10, marginBottom: 20}}>
        <View style={{zIndex: 1000}}>
          <DropdownComponent
            value={itemObj.PRODUCT}
            setValue={value => setItemObj(prev => ({...prev, PRODUCT: value}))}
            data={PRODUCT_DATA}
            title="Select Product"
            placeholder="Select Product"
          />
        </View>
        <View style={{marginTop: -30, zIndex: 1000}}>
          <TextField
            value={itemObj.HSN}
            setValue={value =>
              setItemObj(prev => ({...prev, HSN: value}))
            }
            placeholder="Enter HSN/SAC"
            title="HSN/SAC"
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
              value={itemObj.DC}
              setValue={value =>
                setItemObj(prev => ({...prev, DC: value}))
              }
              placeholder="Enter DC Number"
              title="DC Number"
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
              value={itemObj.ORDER}
              setValue={value =>
                setItemObj(prev => ({...prev, ORDER: value}))
              }
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
              value={itemObj.UNIT}
              setValue={value =>
                setItemObj(prev => ({...prev, UNIT: value}))
              }
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
              value={itemObj.QTY}
              setValue={value =>
                setItemObj(prev => ({...prev, QTY: value}))
              }
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
              setValue={value =>
                setItemObj(prev => ({...prev, RATE: value}))
              }
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
              value={itemObj.AMT}
              setValue={value =>
                setItemObj(prev => ({...prev, AMT: value}))
              }
              title="Amt"
              placeholder="Enter Amt"
            />
          </View>
        </View>
      </View>

      <View
        style={{backgroundColor: '#fff', paddingBottom: 10, marginBottom: 10}}>
      <View
          style={{
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom:10
          }}>
          {/* Date and Time Picker */}
          <View
            style={{
              flex: 1,
              paddingRight: 5,
              height: 60,
            }}>
            <DropdownComponent
              value={itemObj.TAX}
              setValue={value =>
                setItemObj(prev => ({...prev, TAX: value}))
              }
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
              value={itemObj.CGST}
              setValue={value =>
                setItemObj(prev => ({...prev, CGST: value}))
              }
              title="CGST"
              placeholder="CGST"
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
              value={itemObj.IGST}
              setValue={value =>
                setItemObj(prev => ({...prev, IGST: value}))
              }
              placeholder="IGST"
              title="IGST"
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
              setValue={value =>
                setItemObj(prev => ({...prev, SGST: value}))
              }
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
