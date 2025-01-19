import React, {useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyDatePicker = ({title, ErrorMessages, date, setDate, error,required}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={{padding: 8}}>
        <Text style={{color: '#000', marginLeft: 5}}>{title} {required && <Text style={{color:'red'}}>*</Text>}</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setOpen(true)}>
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
            value={date ? date.toLocaleDateString() : ''} // Show selected date or empty
          />
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date || new Date()} // Use current date if no date is selected
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate); // Update state with selected date
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {required && error && !date && (
        <HelperText type="error" visible={error && !date}>
          {ErrorMessages}
        </HelperText>
      )}
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
