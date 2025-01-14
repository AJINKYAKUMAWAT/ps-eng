import React from 'react';
import { View } from 'react-native';
import DropdownComponent from '../../components/common/DropdownText';
import TextField from '../../components/common/TextField';
import MyDatePicker from '../../components/common/Datepicker';

const AddInvoice = () => {
  
  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 1000 }}>
        <DropdownComponent />
      </View>
      <View style={{ marginTop:-30, zIndex: 1000 }}>
        <TextField />
      </View>
      <View style={{ marginTop:-30, zIndex: 1000 }}>
        <MyDatePicker />
      </View>
    </View>
  );
};

export default AddInvoice;
