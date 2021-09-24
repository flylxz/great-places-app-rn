import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const PIN_LOCATION = 'PIN_LOCATION';

export const pinLocation = (coords) => {
  // console.log('action ', coords);
  return {
    type: PIN_LOCATION,
    coords,
  };
};

export const addPlace = (title, image, location) => {
  // console.log(location);
  return async (dispatch) => {
    // need valid key
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.API_KEY}`
    // );

    // if (!response.ok) {
    //   throw new Error('Something went wrong!');
    // }

    // const resData = await response.json();

    // const address = resData.result[0].formatted_address ;
    const address = 'dummy address';

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        'dummy address',
        location.latitude,
        location.longitude
      );
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          location,
        },
      });
    } catch (err) {
      console.log('db error from action: ', err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
