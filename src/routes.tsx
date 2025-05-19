import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Films from "./pages/Films";
import ErrorPage from "./pages/ErrorPage";

export function getBaseURL() {
  return `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APIKEY}`;
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        loader: () => {
          return fetch(`${getBaseURL()}&s=King`);
        },
        element: <HomePage />,
      },
      {
        path: "/details/:id",
        loader: ({ params: { id } }) => {
          return fetch(`${getBaseURL()}&i=${id}&plot=full`);
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
