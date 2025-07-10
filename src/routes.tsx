import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SearchFilm from "./pages/SearchFilm";
import MovieDetails from "./pages/FilmDetail";
import SeriesDetails from "./pages/SeriesDetails";
import { API_KEY } from "./api/API_KEY";

export function getBaseURL() {
  return `https://api.themoviedb.org/3`;
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/details/:id",
        loader: async ({ params: { id } }) => {
          const response = await fetch(
            `${getBaseURL()}/movie/${id}?api_key=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch movie details");
          }
          return response.json();
        },
        element: <MovieDetails />,
      },
      {
        path: "/tv/:id",
        loader: async ({ params: { id } }) => {
          const response = await fetch(
            `${getBaseURL()}/tv/${id}?api_key=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch series details");
          }
          return response.json();
        },
        element: <SeriesDetails />,
      },
      {
        path: "/search",
        element: <SearchFilm />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
