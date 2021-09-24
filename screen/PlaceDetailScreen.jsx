import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MapPreview } from '../components/MapPreview';
import Colors from '../constants/Colors';

export const PlaceDetailScreen = ({ navigation, route }) => {
  const { placeId } = route.params;

  const { places } = useSelector((state) => state.places);

  const { lat, lng, address, imageUri } = places.find(
    (pl) => pl.id === placeId
  );

  const selectedLocation = (location) => {};

  const showMapHandler = () => {
    navigation.navigate('Map', {
      initialLocation: { latitude: lat, longitude: lng },
    });
  };
  // console.log(places.find((pl) => pl.id === placeId));

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        {/* <Text>{selectedPlace.title}</Text> */}
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{ latitude: lat, longitude: lng }}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '35%',
    minHeight: 300,
    backgroundColor: `#ccc`,
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
