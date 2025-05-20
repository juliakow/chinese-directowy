import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterDetails } from '../types/CharacterTypes';

interface FavoritesContextType {
  favorites: CharacterDetails[];
  addFavorite: (character: CharacterDetails) => Promise<void>;
  removeFavorite: (character: CharacterDetails) => Promise<void>;
  isFavorite: (character: CharacterDetails) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<CharacterDetails[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    };
    loadFavorites();
  }, []);

  const updateStorage = async (newFavorites: CharacterDetails[]) => {
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addFavorite = async (character: CharacterDetails) => {
    if (!favorites.some(fav => fav.character === character.character)) {
      const newFavorites = [...favorites, character];
      setFavorites(newFavorites);
      await updateStorage(newFavorites);
    }
  };

  const removeFavorite = async (character: CharacterDetails) => {
    const newFavorites = favorites.filter(fav => fav.character !== character.character);
    setFavorites(newFavorites);
    await updateStorage(newFavorites);
  };

  const isFavorite = (character: CharacterDetails) => {
    return favorites.some(fav => fav.character === character.character);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};