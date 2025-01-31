import * as React from 'react';
import {Text, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const TextField = ({
  title,
  ErrorMessages,
  value,
  setValue,
  error,
  placeholder,
  required,
}) => {
  const onChangeText = value => setValue(value);

  const hasErrors = () => {
    return !value.includes('@');
  };

  return (
    <View style={{padding: 8}}>
      <Text style={{color: '#000', marginBottom: -5, marginLeft: 5}}>
        {title} {required && <Text style={{color: 'red'}}>*</Text>}
      </Text>
      <TextInput
        style={{
          backgroundColor: 'transparent',
          fontSize: 15,
          paddingHorizontal: 5, // Adjust horizontal padding
          paddingVertical: 2, // Adjust vertical padding
          height: 40,
        }}
        placeholder={placeholder}
        textColor="#000"
        value={value}
        onChangeText={onChangeText}
        activeUnderlineColor="#000"
      />

      {required && error && !value && (
        <HelperText type="error" visible={error && !value}>
          {ErrorMessages}
        </HelperText>
      )}
    </View>
  );
};

export default TextField;
