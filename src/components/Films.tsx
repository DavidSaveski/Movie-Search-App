import { useEffect } from "react";
import { useFilmStore } from "../zustand/MovieStore";
import { searchMovies } from "../api/ApiKey";

export default function Films() {
  const { films, setFilms, deleteMovie } = useFilmStore();

  useEffect(() => {
    setFilms(films);
  }, [setFilms, films]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await searchMovies();
      setFilms(result);
    };

    fetchData();
  }, [setFilms]);

  return (
    <div>
      {" "}
      {films.map((film) => (
        <div key={film.imdbID}>
          <img src={film.Poster} alt={film.Title} />
          <p>{film.Title}</p>
          <button onClick={() => deleteMovie(film.imdbID)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
