import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HelperText} from 'react-native-paper';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null); // Selected value
  const [isFocus, setIsFocus] = useState(false); // Dropdown focus state

  const renderItem = item => {
    if (isFocus) {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            setValue(item.value);
            setIsFocus(false); // Close dropdown after selecting a value
          }}>
          <Text
            style={[
              styles.itemText,
              {color: value === item.value ? 'blue' : 'black'},
            ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: '#000', marginBottom: -5, marginLeft: 5}}>
        Select Customer
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)} // Open dropdown on focus
        onBlur={() => setIsFocus(false)} // Close dropdown on blur
        onChange={item => {
          setValue(item.value); // Update selected value
          setIsFocus(false); // Close dropdown
        }}
        renderItem={renderItem} // Custom render for dropdown items
      />
      <HelperText type="error" visible={false}>
        Email address is invalid!
      </HelperText>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderBottomWidth: 1, // Add only a bottom border
    borderBottomColor: 'gray', // Set the color for the bottom border
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});
