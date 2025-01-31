import React, {useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DateAndTimePicker = ({title,ErrorMessages, date, setDate,time, setTime, error,required}) => {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  return (
    <>
      <View style={{padding: 8}}>
        <Text style={{color: '#000',marginTop:-5,marginBottom:5, marginLeft: 5}}>
          {title} {required && <Text style={{color:'red'}}>*</Text>}
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
            placeholder="Date & Time"
            placeholderTextColor="#999"
            editable={false} // Prevent direct input
            value={date ? `${date.toLocaleDateString()} ${time ? time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }) : ''}` : ''} // Show the selected date and time
          />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date || new Date()}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
          setOpenTime(true); // Open time picker after selecting the date
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {/* Time Picker */}
      <DatePicker
        modal
        mode="time"
        open={openTime}
        date={time || new Date()}
        onConfirm={(selectedTime) => {
          setOpenTime(false);
          setTime(selectedTime);
        }}
        onCancel={() => {
          setOpenTime(false);
        }}
      />

      {(required && error && !date && !time) &&
         <HelperText type="error" visible={error && !date && !time}>
         {ErrorMessages}
       </HelperText>
      }
    
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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

export default DateAndTimePicker;
