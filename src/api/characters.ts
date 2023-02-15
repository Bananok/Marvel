import { Card, EntityResponse } from "../types/card";
import axios from "./helpers/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getCharacterById(characterId?: string): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(
      `characters/${characterId}`
    );

    return response.data.data.results;
  },
  async getCharactersScroll(offset: number): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`characters`, {
      params: {
        offset: offset * 20,
      },
    });

    return response.data.data.results;
  },
  async getSearchCharacters(
    offset: number,
    nameStartsWith: string
  ): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`characters`, {
      params: {
        offset: offset * 20,
        nameStartsWith,
      },
    });

    return response.data.data.results;
  },
};
