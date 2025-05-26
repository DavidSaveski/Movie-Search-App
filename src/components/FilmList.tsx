import type { FilmType } from "../interface/FilmInterface";

type Props = {
  films: FilmType[];
};

import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function FilmList({ films }: Props) {
  if (!films || films.length === 0) {
    return <p>No movies to display</p>;
  }

  return (
    <div className="film-grid">
      {films.map((film) => (
        <div key={film.id} className="film-card">
          <Link to={`/details/${film.id}`}>
            {film.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${film.poster_path}`}
                alt={film.title}
                className="film-poster"
              />
            ) : (
              <div className="no-poster">No Image</div>
            )}
            <div className="film-info">
              <h3>{film.title}</h3>
              <p>Release: {new Date(film.release_date).getFullYear()}</p>
              <p>Rating: ★ {film.vote_average.toFixed(1)}/10</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
