import { Card, EntityResponse } from "../types/card";
import axios from "./helpers/axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getSeriesById(seriesId?: string): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`series/${seriesId}`);

    return response.data.data.results;
  },
  async getSeriesScroll(offset: number): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`series`, {
      params: {
        offset: offset * 20,
      },
    });

    return response.data.data.results;
  },
  async getSearchSeries(
    offset: number,
    titleStartsWith: string
  ): Promise<Card[]> {
    const response = await axios.get<EntityResponse>(`series`, {
      params: {
        offset: offset * 20,
        titleStartsWith,
      },
    });

    return response.data.data.results;
  },
};
