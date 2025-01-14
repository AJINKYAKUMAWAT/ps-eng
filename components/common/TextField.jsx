import * as React from 'react';
import {Text, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const TextField = () => {
  const [text, setText] = React.useState('');

  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return !text.includes('@');
  };

  return (
    <View style={{padding: 8}}>
      <Text style={{color: '#000', marginBottom: -5, marginLeft: 5}}>
        Select Customer
      </Text>
      <TextInput
        style={{backgroundColor: 'transparent'}}
        placeholder="Email"
        textColor="#000"
        value={text}
        onChangeText={onChangeText}
        activeUnderlineColor="#000"
      />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
    </View>
  );
};

export default TextField;
