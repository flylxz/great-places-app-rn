import { ADD_PLACE, PIN_LOCATION, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: [],
  pinedLocation: null,
};

export const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIN_LOCATION: {
      // console.log(action.coords);
      return { ...state, pinedLocation: action.coords };
    }
    case SET_PLACES:
      return {
        ...state,
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.location.latitude,
        action.placeData.location.longitude
      );

      return { ...state, places: [...state.places, newPlace] };

    default:
      return state;
  }
};
