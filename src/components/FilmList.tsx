import { Link } from "react-router-dom";
import "../styles/FilmCardStyle.css";
import { useMemo } from "react";
import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";

type Props = {
  popularFilms: FilmType[];
};
export default function FilmList({ popularFilms }: Props) {
  const sortedFilms = useMemo(() => {
    return [...popularFilms].sort((a, b) => b.vote_average - a.vote_average);
  }, [popularFilms]);

  const formatReleaseDate = (dateString: string): string => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!popularFilms || popularFilms.length === 0) {
    return <p>No movies to display</p>;
  }

  return (
    <div className="film-grid wrap">
      <h2>Most Popular Films</h2>
      <div className="film-carousel ">
        {[...sortedFilms].map((film, index) => (
          <div key={`${film.id}-${index}`} className="film-card">
            <Link to={`/details/${film.id}`}>
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
            </Link>
            <div className="film-info">
              <h3>{film.title}</h3>
              <p style={{ color: "rgba(0,0,0,.6)" }}>
                {formatReleaseDate(film.release_date)}
              </p>
              <p>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                ></i>
                {film.vote_average.toFixed(1)}/10
              </p>
            </div>
          </div>
        ))}
        {[...sortedFilms].map((film, index) => (
          <div key={`${film.id}-${index}`} className="film-card">
            <Link to={`/details/${film.id}`}>
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
            </Link>
            <div className="film-info">
              <h3>{film.title}</h3>
              <p style={{ color: "rgba(0,0,0,.6)" }}>
                {formatReleaseDate(film.release_date)}
              </p>
              <p>
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#FFD43B" }}
                ></i>
                {film.vote_average.toFixed(1)}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
