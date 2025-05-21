import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';
import { CharacterDetails } from '../types/CharacterTypes';

const CharacterCard = ({ character }: { character: CharacterDetails }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.character}>{character.character}</Text>
      <Text>{character.kDefinition || 'Brak definicji'}</Text>
      <FavoriteButton character={character} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  character: {
    fontSize: 32,
    marginBottom: 5,
  }
});

export default CharacterCard;