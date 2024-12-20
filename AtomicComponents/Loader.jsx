import React from 'react';
import { ActivityIndicator } from 'react-native';
import { palette } from '../theme/palette';

export const Loader = ({ size ,color=palette.primary}) => {
  return <ActivityIndicator size={size || "large"} color={color} />;
};
