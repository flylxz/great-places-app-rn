import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { pinLocation } from '../store/places-actions';

import { Colors } from '../constants/Colors';

export const MapScreen = ({ navigation, route }) => {
  const { initialLocation } = route.params;
  const [selectedLocation, setSelectedLocation] = useState();
  const { pinedLocation } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pinedLocation) {
      setSelectedLocation(pinedLocation);
    }
    if (initialLocation) {
      setSelectedLocation(initialLocation);
    }
    console.log('selectedLocation: ', initialLocation);
  }, []);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 50.02,
    longitude: initialLocation ? initialLocation.lng : 36.22,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0231,
  };

  const selectLocationHandler = (e) => {
    console.log('e: ', e.nativeEvent.coordinate);
    const coords = e.nativeEvent.coordinate;
    setSelectedLocation(coords);
    console.log('e: ', selectedLocation);
  };

  const savePickedLocationHandler = () => {
    console.log('save: ', selectedLocation);
    dispatch(pinLocation(selectedLocation));
    navigation.navigate('NewPlace');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={savePickedLocationHandler}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker title="Picked location" coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});
