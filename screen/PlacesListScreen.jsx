import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { PlaceItem } from '../components/PlaceItem';
import { loadPlaces } from '../store/places-actions';

export const PlacesListScreen = ({ navigation }) => {
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, []);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          item={item}
          onPress={() =>
            navigation.navigate('PlaceDetail', {
              placeTitle: item.title,
              placeId: item.id,
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
