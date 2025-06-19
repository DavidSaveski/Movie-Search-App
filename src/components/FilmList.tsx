import { Link } from "react-router-dom";
import "../styles/FilmCardStyle.css";
import { useMemo } from "react";
import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";
import { useAutoCarousel } from "../hooks/SmoothBgTransition";
import { formatReleaseDate } from "../utils/formatReleaseDate";

type Props = {
  popularFilms: FilmType[];
};

export default function FilmList({ popularFilms }: Props) {
  const sortedFilms = useMemo(() => {
    return [...popularFilms].sort((a, b) => b.vote_average - a.vote_average);
  }, [popularFilms]);
  const {
    currentItem: currentFilm,
    nextItem: nextFilm,
    isTransitioning,
  } = useAutoCarousel(sortedFilms, 4000, 1000);

  if (!popularFilms || popularFilms.length === 0) {
    return <p>No movies to display</p>;
  }

  const firstPagePopularMovies = sortedFilms.slice(0, 20);
  return (
    <main className="main-div">
      <div
        className="current-background"
        style={getBackgroundStyle(currentFilm, false, isTransitioning)}
      />
      <div
        className="next-background"
        style={getBackgroundStyle(nextFilm, true, isTransitioning)}
      />
      <div
        className="film-grid wrap content-layer"
        style={{
          color: isTransitioning ? "black" : "white",
          transition: "color 1s ease-in-out",
        }}
      >
        <h2>Most Popular Films</h2>
        <div className="carousel-container">
          <div className="film-carousel ">
            {[...firstPagePopularMovies, ...firstPagePopularMovies].map(
              (film, index) => (
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
                    <p>{formatReleaseDate(film.release_date)}</p>
                    <p>
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "#FFD43B" }}
                      ></i>
                      {film.vote_average.toFixed(1)}/10
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
