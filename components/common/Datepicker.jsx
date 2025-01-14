import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={{padding: 8}}>
        <Text style={{color: '#000', marginBottom: 5, marginLeft: 5}}>
          Select Date
        </Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setOpen(true)}
        >
          <Icon
            name="calendar-month"
            size={20}
            color="#000"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Select Date"
            placeholderTextColor="#999"
            editable={false} // Prevent direct input
            value={date.toLocaleDateString()} // Show the selected date
          />
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        mode='date'
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  iconStyle: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: '#000',
    paddingVertical: 5,
    fontSize: 16,
  },
});

export default MyDatePicker;
