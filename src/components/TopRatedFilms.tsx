import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import { useAutoCarousel } from "../hooks/SmoothBgTransition";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  topRatedFilms: FilmType[];
};

export default function TopRatedFilmsComp({ topRatedFilms }: Props) {
  const {
    currentItem: currentFilm,
    nextItem: nextFilm,
    isTransitioning,
  } = useAutoCarousel(topRatedFilms, 4000, 1000);

  const sortedTopRatedFilms = useMemo(() => {
    return [...topRatedFilms].sort((a, b) => b.popularity - a.popularity);
  }, [topRatedFilms]);

  return (
    <div style={{ position: "relative" }}>
      <div
        className="current-background"
        style={{
          ...getBackgroundStyle(currentFilm, false, isTransitioning),
        }}
      />
      <div
        className="next-background"
        style={{
          opacity: isTransitioning ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          ...getBackgroundStyle(nextFilm, false, isTransitioning),
        }}
      />
      <div
        className="film-grid wrap content-layer"
        style={{
          color: isTransitioning ? "black" : "white",
          transition: "color 1s ease-in-out",
        }}
      >
        <h3>Top Rated Films</h3>
        <div className="carousel-container">
          <div className="film-carousel">
            {sortedTopRatedFilms.map((film) => (
              <div key={`${film.id}`} className="film-card">
                <Link to={`/details/${film.id}`}>
                  <img
                    src={getImageUrl(film.poster_path, "w200")}
                    alt={film.title}
                    className="film-poster"
                  />
                </Link>
                <h3>{film.title}</h3>
                <p>{film.popularity}</p>
              </div>
            ))}
            {sortedTopRatedFilms.map((film) => (
              <div key={`${film.id}`} className="film-card">
                <Link to={`/details/${film.id}`}>
                  <img
                    src={getImageUrl(film.poster_path, "w200")}
                    alt={film.title}
                    className="film-poster"
                  />
                </Link>
                <h3>{film.title}</h3>
                <p>{film.popularity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
