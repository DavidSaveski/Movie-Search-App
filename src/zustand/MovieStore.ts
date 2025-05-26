import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FilmType } from "../interface/FilmInterface";

type FilmStore = {
  films: FilmType[];
  setFilms: (films: FilmType[]) => void;
  addMovie: (newFilm: FilmType) => void;
  deleteMovie: (id: number) => void;
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
      deleteMovie: (id) =>
        set((state) => ({
          films: state.films.filter((film) => film.id !== id),
        })),
    }),
    {
      name: "film-storage",
    }
  )
);
