import * as React from 'react';
import { Button } from 'react-native-paper';

const ButtonWithIcon = ({title,onPress,icon,background,color}) => (
  <Button style={{borderRadius:5,backgroundColor:background,borderColor:'#4894FE',borderWidth:1}} labelStyle={{color:color}} icon={icon} mode="contained" onPress={onPress}>
   {title}
  </Button>
);

export default ButtonWithIcon;