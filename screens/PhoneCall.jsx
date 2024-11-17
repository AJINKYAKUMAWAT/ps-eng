import React from 'react';
import {View, Button} from 'react-native';
import call from 'react-native-phone-call';

const PhoneCall = () => {
  const makeCall = () => {
    const args = {
      number: '+917263994600', // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  return (
    <View>
      <Button title="Make Call" onPress={makeCall} />
    </View>
  );
};

export default PhoneCall;
