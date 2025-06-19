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

  const firstPageTopRatedFilms = sortedTopRatedFilms.slice(0, 20);

  return (
    <main className="main-div">
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
            {[...firstPageTopRatedFilms, ...firstPageTopRatedFilms].map(
              (film, index) => (
                <div key={`${film.id}-${index}`} className="film-card">
                  <Link to={`/details/${film.id}`}>
                    <img
                      src={getImageUrl(film.poster_path, "w200")}
                      alt={film.title}
                      className="film-poster"
                    />
                  </Link>
                  <h3>{film.title}</h3>
                  <p>
                    <i
                      className="fa-solid fa-fire-flame-curved burning-icon"
                      style={{ color: "red", marginRight: "5px" }}
                    ></i>
                    {film.popularity.toFixed(2)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
