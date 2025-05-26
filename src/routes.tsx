import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Films from "./pages/Films";
import ErrorPage from "./pages/ErrorPage";

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
        loader: async () => {
          const response = await fetch(
            `${getBaseURL()}/movie/popular?api_key=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }
          return response.json();
        },
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
        element: <Films />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
