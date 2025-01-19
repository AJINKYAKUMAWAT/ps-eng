import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {HelperText} from 'react-native-paper';



const DropdownComponent = ({required, data,title,ErrorMessages, value, setValue, error,placeholder}) => {
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
      <Text style={{color: '#000', marginLeft: 5}}>
        {title} {required && <Text style={{color:'red'}}>*</Text>}
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
        placeholder={!isFocus ? placeholder : '...'}
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

      {required && error && !value && 
       <HelperText style={{marginTop:5,marginBottom:5,marginLeft:-13}} type="error" visible={error && !value}>
        {ErrorMessages}
      </HelperText>
      }
     
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    marginBottom:20
  },
  dropdown: {
    height: 40,
    borderBottomWidth: 1, // Add only a bottom border
    borderBottomColor: 'grey', // Set the color for the bottom border
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
