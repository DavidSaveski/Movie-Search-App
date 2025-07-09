import { create } from "zustand";
import type {
  TVSeriesResponse,
  TVSeriesSearchResult,
  TVSeriesType,
} from "../zustand/TVSeriesStore";
import { getBaseURL } from "../routes";

const API_KEY = import.meta.env.VITE_APIKEY;

type TVSeriesStore = {
  TVSeriesData: TVSeriesSearchResult[];
  searchResults: TVSeriesSearchResult[];
  setTVSeries: (series: TVSeriesSearchResult[]) => void;
  fetchTVSeries: () => Promise<void>;
  fetchTVSeriesDetails: (id: number) => Promise<TVSeriesType | null>;
  searchTVSeries: (query: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const useTVSeriesStore = create<TVSeriesStore>()((set) => ({
  TVSeriesData: [],
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,

  setTVSeries: (series: TVSeriesSearchResult[]) => {
    set({ TVSeriesData: series });
  },

  fetchTVSeries: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/tv/popular?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TVSeriesResponse = await response.json();

      set({
        TVSeriesData: data.results,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch TV series",
        loading: false,
        TVSeriesData: [],
      });
    }
  },
  fetchTVSeriesDetails: async (id: number): Promise<TVSeriesType | null> => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,similar,recommendations`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TVSeriesType = await response.json();

      set({ loading: false });
      return data;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch TV series details",
        loading: false,
      });
      return null;
    }
  },

  searchTVSeries: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], error: null });
      return;
    }

    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TVSeriesResponse = await response.json();

      set({
        searchResults: data.results,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to search TV series",
        loading: false,
        searchResults: [],
      });
    }
  },
}));
