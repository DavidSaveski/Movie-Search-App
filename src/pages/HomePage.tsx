import { useLoaderData } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { getBaseURL } from "../routes";
import FilmList from "../components/FilmList";
import type { FilmsResponseType } from "../interface/FilmInterface";

const API_KEY = import.meta.env.VITE_APIKEY;

export default function HomePage() {
  const { results: initialFilms } = useLoaderData<FilmsResponseType>();
  const [films, setFilms] = useState(initialFilms);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQueryChange = async (text: string) => {
    if (text.length < 3) {
      setFilms(initialFilms);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${getBaseURL()}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          text
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data: FilmsResponseType = await response.json();
      if (data.results && data.results.length > 0) {
        setFilms(data.results);
      } else {
        setFilms([]);
        setError("No movies found");
      }
      if (data.results && data.results.length > 0) {
        setFilms(data.results);
      } else {
        setFilms([]);
        setError("No movies found");
      }
    } catch (err) {
      setError(err.message);
      setFilms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navigation onHandleQueryChange={handleQueryChange} />
      {loading && <p>Searching...</p>}
      {error ? <p className="error">{error}</p> : <FilmList films={films} />}
      {/* Slide show idea here */}
    </section>
  );
}
