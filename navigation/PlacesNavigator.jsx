import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import { PlacesListScreen } from '../screen/PlacesListScreen';
import { NewPlaceScreen } from '../screen/NewPlaceScreen';
import { MapScreen } from '../screen/MapScreen';
import { PlaceDetailScreen } from '../screen/PlaceDetailScreen';
import { HeaderButton } from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const PlacesNavigator = () => {
  const { navigate } = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        },
      }}
    >
      <Stack.Screen
        name="Places List"
        component={PlacesListScreen}
        options={{
          title: 'All Places',
          headerRight: () => (
            <HeaderButton onPress={() => navigate('NewPlace')}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                size={23}
              />
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={({ route }) => ({
          title: route.params.placeTitle,
        })}
      />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{
          title: 'Add place',
        }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator />
    </NavigationContainer>
  );
};
