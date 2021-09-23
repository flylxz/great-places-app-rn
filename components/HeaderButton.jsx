import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const HeaderButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
};
