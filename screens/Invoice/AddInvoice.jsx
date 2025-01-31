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
import {CONFIRMATION_MESSAGES, CUSTOMER_DATA, MATERIAL_TYPE} from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import ControlModal from '../../components/common/Modal';
import {useToast} from 'react-native-toast-notifications';

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

const AddInvoice = () => {
  const toast = useToast()
    const [showModal,setShowModal] = useState(false)
  
    const navigation = useNavigation()
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
  const defaultColumns = useCallback(data => {
    return [
      {
        id: '1',
        title: 'Desert',
        data: data.map(i => <Text>{i.name}</Text>),
        collapse: true,
      },
      {
        id: '2',
        title: 'Calories',
        data: data.map(i => <Text>{i.calories}</Text>),
      },
      {
        id: '3',
        title: 'Fat',
        data: data.map(i => <Text>{i.fat}</Text>),
      },
      {
        id: '4',
        title: 'Action',
        data: data.map(i => <Text>{i.fat}</Text>),
      },
    ];
  }, []);

  const columns = useMemo(() => defaultColumns(data), []);

  const addItem = async() => {
    // if (!itemObj.customer || !itemObj.materialType) {
    //   setError(true);
    // }
    await AsyncStorage.setItem('path', route.name);
    navigation.navigate('Add Line Item')
  };

  const onSubmit = () => {
    navigation.navigate('Sales Invoice')
  }

  const onPress =async () => {
    await AsyncStorage.setItem('path', route.name);
    navigation.navigate('Edit Line Item')
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onDelete = () => {
    setShowModal(false)
    toast.show('Delete Successfully', {
      data: {
        type: 'success',
        message: 'Delete Successfully',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      },
    });
  }


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
        <TableList data={data} colums={columns} onPress={onPress} onDelete={()=>setShowModal(true)}/>
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
      <ControlModal onCancel={onCancel} showModal={showModal} onPress={onDelete} CONFIRMATION_MESSAGES={CONFIRMATION_MESSAGES.LINE_ITEM_DELETE}/>
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

export default AddInvoice;
