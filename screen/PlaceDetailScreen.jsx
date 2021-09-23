import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const PlaceDetailScreen = ({ route }) => {
  const { placeId, placeTitle } = route.params;
  return (
    <View>
      <Text>Places Detail screen</Text>
      <Text>{placeTitle}</Text>
      <Text>{placeId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
