import React, { useState, useContext } from 'react';
import { View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { searchCharacters } from '../api/ccdb';
import CharacterCard from '../components/CharacterCard';
import { FavoritesContext } from '../context/FavoritesContext';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CharacterDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const { favorites } = useContext(FavoritesContext);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchCharacters(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Wpisz znak chiński..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.character}
          renderItem={({ item }) => (
            <CharacterCard character={item} />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;