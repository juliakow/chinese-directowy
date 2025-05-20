import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import CharacterDetailScreen from '../screens/CharacterDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';

export type RootStackParamList = {
  Search: undefined;
  CharacterDetail: { character: string };
  Favorites: undefined;
  Flashcards: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
    <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ title: 'Details' }} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
    <Stack.Screen name="Flashcards" component={FlashcardsScreen} options={{ title: 'Flashcards' }} />
  </Stack.Navigator>
);