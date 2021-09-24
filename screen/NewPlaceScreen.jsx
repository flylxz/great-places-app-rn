import React, { useState, useEffect } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ImgPicker } from '../components/ImgPicker';
import { LocationPicker } from '../components/LocationPicker';

import Colors from '../constants/Colors';
import { addPlace } from '../store/places-actions';

export const NewPlaceScreen = ({ navigation, route }) => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(
      addPlace(titleValue, selectedImage, {
        latitude: 50.02,
        longitude: 36.22,
      })
    );
    navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={navigation} />
        <Button
          title="Save Place"
          onPress={savePlaceHandler}
          color={Colors.primary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
