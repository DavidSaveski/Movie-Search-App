import { create } from "zustand";
import type {
  FilmType,
  FilmsResponseType,
  TrailerType,
  TrailersResponseType,
} from "../interface/FilmInterface";
import { getBaseURL } from "../routes";
import { API_KEY } from "../api/API_KEY";

type FilmStore = {
  // State
  popularFilms: FilmType[];
  topRatedFilms: FilmType[];
  trailers: TrailerType[];
  selectedFilmId: number | null;
  loading: boolean;
  trailersLoading: boolean;
  error: string | null;
  // Setters
  setPopularFilms: (films: FilmType[]) => void;
  setTopRatedFilms: (films: FilmType[]) => void;
  setTrailers: (trailers: TrailerType[]) => void;
  setSelectedFilmId: (filmId: number | null) => void;
  // API methods
  fetchTopRatedFilms: () => Promise<void>;
  fetchPopularFilms: () => Promise<void>;
  fetchFilmTrailers: (filmId: number) => Promise<void>;
  searchFilms: (query: string) => Promise<void>;
};

export const useFilmStore = create<FilmStore>()((set, get) => ({
  popularFilms: [],
  topRatedFilms: [],
  trailers: [],
  selectedFilmId: null,
  trailersLoading: false,
  loading: false,
  error: null,

  // Setters
  setPopularFilms: (popularFilms: FilmType[]) => {
    set({ popularFilms });
  },
  setTopRatedFilms: (topRatedFilms: FilmType[]) => {
    set({ topRatedFilms });
  },
  setTrailers: (trailers: TrailerType[]) => {
    set({ trailers });
  },
  setSelectedFilmId: (selectedFilmId: number | null) => {
    set({ selectedFilmId });
  },

  // Fetching popular movies
  fetchPopularFilms: async () => {
    try {
      set({ loading: true, error: null });

      const allResults = [];

      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `${getBaseURL()}/movie/popular?api_key=${API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch popular movies from page ${page}`);
        }

        const data: FilmsResponseType = await response.json();
        allResults.push(...data.results);
      }

      set({ popularFilms: allResults, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
        popularFilms: [],
      });
    }
  },

  // fetching film trailers
  fetchFilmTrailers: async (filmId: number) => {
    try {
      set({
        trailersLoading: true,
        error: null,
        trailers: [],
        selectedFilmId: null,
      });

      const response = await fetch(
        `${getBaseURL()}/movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch trailers for movie ${filmId}`);
      }

      const data: TrailersResponseType = await response.json();
      const trailers = data.results.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      set({
        trailers,
        selectedFilmId: filmId,
        trailersLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch trailers",
        trailersLoading: false,
        trailers: [],
        selectedFilmId: null,
      });
    }
  },
  searchFilms: async (query: string) => {
    if (!query.trim()) {
      get().fetchPopularFilms();
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
  // Fetching top rated films
  fetchTopRatedFilms: async () => {
    try {
      set({ loading: true, error: null });

      const allResults = [];

      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `${getBaseURL()}/movie/top_rated?api_key=${API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch top rated movies from page ${page}`);
        }

        const data: FilmsResponseType = await response.json();
        allResults.push(...data.results);
      }

      set({ topRatedFilms: allResults, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
        topRatedFilms: [],
      });
    }
  },
}));
