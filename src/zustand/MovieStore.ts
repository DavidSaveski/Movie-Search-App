import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FilmsType } from "../interface/FilmInterface";

type FilmStore = {
  films: FilmsType[];
  setFilms: (films: FilmsType[]) => void;
  addMovie: (newFilm: FilmsType) => void;
  deleteMovie: (imdbID: string) => void;
};

export const useFilmStore = create<FilmStore>()(
  persist(
    (set) => ({
      films: [],

      setFilms: (films) => set({ films }),
      addMovie: (newFilm) =>
        set((state) => ({
          films: [...state.films, newFilm],
        })),
      deleteMovie: (imdbID) =>
        set((state) => ({
          films: state.films.filter((film) => film.imdbID !== imdbID),
        })),
    }),
    {
      name: "film-storage", // localStorage key name
    }
  )
);
