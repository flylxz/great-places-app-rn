import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 50.02,
    longitude: 36.22,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0231,
  };

  const selectLocationHandler = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };
  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = selectedLocation;
    console.log(markerCoordinates);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker title="Picked location" coordinate={markerCoordinates} />
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
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
