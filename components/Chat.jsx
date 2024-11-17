/* eslint-disable prettier/prettier */

import * as React from 'react';
import {View} from 'react-native';
import {Portal, Avatar} from 'react-native-paper';

const Chat = () => {
  return (
    <Portal>
      <View style={{position: 'absolute', bottom: 5, right: 20}}>
        <Avatar.Icon size={50} icon="chat" />
      </View>
    </Portal>
  );
};

export default Chat;
