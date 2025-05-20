import axios from 'axios';
import { CharacterDetails } from '../types/CharacterTypes';

const API_BASE_URL = 'http://ccdb.hemiola.com/';

export const searchCharacters = async (query: string): Promise<CharacterDetails[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}characters/search/${encodeURIComponent(query)}`);
    return response.data.map((char) => ({ character: char }));
  } catch (error) {
    console.error('Error searching characters:', error);
    return [];
  }
};

export const getCharacterDetails = async (character: string): Promise<CharacterDetails | null> => {
  try {
    const response = await axios.get<CharacterDetails[]>(
      `${API_BASE_URL}characters/string/${encodeURIComponent(character)}?fields=kDefinition,kMandarin,kTotalStrokes,kXHC1983,kHanyuPinyin,kCantonese,kTang,kKorean,kJapanese,kVietnamese,kDictionaryIndices`
    );
    return response.data[0] || null;
  } catch (error) {
    console.error('Error fetching character details:', error);
    return null;
  }
};