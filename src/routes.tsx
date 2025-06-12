import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SearchFilm from "./pages/SearchFilm";
import MovieDetails from "./pages/FilmDetail";

export function getBaseURL() {
  return `https://api.themoviedb.org/3`;
}
const API_KEY = import.meta.env.VITE_APIKEY;

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
