import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import { MapPreview } from './MapPreview';

export const LocationPicker = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationHandler = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      setIsFetching(true);
      let location = await Location.getCurrentPositionAsync();
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      console.log('error from location picker: ', err);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map',
        [{ text: 'Okay' }]
      );
    }
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickOnMapHandler}
      >
        {isFetching && !location ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
        {errorMsg && <Text>{errorMsg}</Text>}
      </MapPreview>

      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
