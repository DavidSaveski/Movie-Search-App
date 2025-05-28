import { create } from "zustand";
import type { FilmType, FilmsResponseType } from "../interface/FilmInterface";
import { getBaseURL } from "../routes";

const API_KEY = import.meta.env.VITE_APIKEY;

type FilmStore = {
  popularFilms: FilmType[];
  topRatedFilms: FilmType[];
  trailers: [];
  loading: boolean;
  error: string | null;
  setPopularFilms: (films: FilmType[]) => void;
  setTopRatedFilms: (films: FilmType[]) => void;
  fetchTopRatedFilms: () => Promise<void>;
  fetchPopularMovies: () => Promise<void>;
  fetchTrailers: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
};

export const useFilmStore = create<FilmStore>()((set, get) => ({
  popularFilms: [],
  topRatedFilms: [],
  trailers: [],
  loading: false,
  error: null,

  setPopularFilms: (popularFilms: FilmType[]) => {
    set({ popularFilms });
  },
  setTopRatedFilms: (topRatedFilms: FilmType[]) => {
    set({ topRatedFilms });
  },

  fetchPopularMovies: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/movie/popular?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data: FilmsResponseType = await response.json();
      set({ popularFilms: data.results, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
        popularFilms: [],
      });
    }
  },
  fetchTrailers: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/movie/popular?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data: FilmsResponseType = await response.json();
      set({ popularFilms: data.results, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
        popularFilms: [],
      });
    }
  },
  searchMovies: async (query: string) => {
    if (!query.trim()) {
      get().fetchPopularMovies();
      return;
    }

    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to search movies");
      }

      const data: FilmsResponseType = await response.json();

      if (data.results.length === 0) {
        set({
          popularFilms: [],
          loading: false,
          error: "No movies found for your search",
        });
      } else {
        set({ popularFilms: data.results, loading: false });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Search failed",
        loading: false,
        popularFilms: [],
      });
    }
  },
  fetchTopRatedFilms: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(
        `${getBaseURL()}/movie/top_rated?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch top rated movies");
      }

      const data: FilmsResponseType = await response.json();
      set({ topRatedFilms: data.results, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
        topRatedFilms: [],
      });
    }
  },
}));
