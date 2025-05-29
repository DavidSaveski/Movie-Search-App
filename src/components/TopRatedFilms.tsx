import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import { useAutoCarousel } from "../hooks/SmoothBgTransition";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";

type Props = {
  topRatedFilms: FilmType[];
};

export default function TopRatedFilmsComp({ topRatedFilms }: Props) {
  const {
    currentItem: currentFilm,
    nextItem: nextFilm,
    isTransitioning,
  } = useAutoCarousel(topRatedFilms, 4000, 1000);

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
      <div className=" film-grid wrap content-layer">
        <h3>Top Rated Films</h3>
        <div className="film-carousel">
          {topRatedFilms.map((film) => (
            <div key={`${film.id}`} className="film-card">
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
              <h3 style={{ color: "white" }}>{film.title}</h3>
              <p>{film.popularity}</p>
            </div>
          ))}
          {topRatedFilms.map((film) => (
            <div key={`${film.id}`} className="film-card">
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
              <h3 style={{ color: "white" }}>{film.title}</h3>
              <p>{film.popularity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
