import { useLoaderData } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useState } from "react";
import {
  OMDBResponse,
  type FilmsResponseType,
} from "../interface/FilmInterface";
import { getBaseURL } from "../routes";
import FilmList from "../components/FilmList";

export default function HomePage() {
  const { Search: initialFilms } = useLoaderData<FilmsResponseType>();

  const [films, setFilms] = useState(initialFilms);
  const [error, setError] = useState("");

  const handleQueryChange = (text: string) => {
    console.log(text);
    if (text.length < 3) {
      return;
    }

    fetch(`${getBaseURL()}&s=${text}`)
      .then((res) => res.json())
      .then((data: FilmsResponseType) => {
        if (data.Response === OMDBResponse.True) {
          setFilms(data.Search);
          setError("");
        } else if (data.Response === OMDBResponse.False) {
          setFilms([]);
          setError(data.Error);
        }
      });
  };
  return (
    <section>
      <Navigation onHandleQueryChange={handleQueryChange} />
      {error ? <p>{error}</p> : <FilmList films={films} />}
      {/* Slide show idea here */}
    </section>
  );
}
