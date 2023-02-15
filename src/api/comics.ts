import { Card, EntityResponse } from "../types/card";
import axios from "./helpers/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getComicById(comicId?: string): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`comics/${comicId}`);

    return response.data.data.results;
  },
  async getComicsScroll(offset: number): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`comics`, {
      params: {
        offset: offset * 20,
      },
    });

    return response.data.data.results;
  },
  async getSearchComics(
    offset: number,
    titleStartsWith: string
  ): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`comics`, {
      params: {
        offset: offset * 20,
        titleStartsWith,
      },
    });

    return response.data.data.results;
  },
};
