import { useEffect, useState } from "react";
import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";

type Props = {
  topRatedFilms: FilmType[];
};

export default function TopRatedFilmsComp({ topRatedFilms }: Props) {
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [nextFilmIndex, setNextFilmIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (topRatedFilms.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentFilmIndex(nextFilmIndex);
        setNextFilmIndex((nextFilmIndex + 1) % topRatedFilms.length);
        setIsTransitioning(false);
      }, 1000); // Match transition duration
    }, 4000);

    return () => clearInterval(interval);
  }, [topRatedFilms.length, nextFilmIndex]);

  const currentFilm = topRatedFilms[currentFilmIndex];

  const getBackgroundStyle = (film: FilmType | undefined, isNext = false) => {
    if (!film) return { backgroundColor: "lightcoral" };

    const imagePath = film.backdrop_path;
    if (imagePath) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${getImageUrl(
          imagePath,
          "w1280"
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: isNext ? (isTransitioning ? 1 : 0) : isTransitioning ? 0 : 1,
        transition: "opacity 1s ease-in-out",
      };
    }
    return { backgroundColor: "lightcoral" };
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className="current-background"
        style={{
          ...getBackgroundStyle(currentFilm),
        }}
      />
      <div className="next-background" />
      <div
        className="film-grid wrap"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h3>Top Rated Films</h3>
        <div className="film-carousel">
          {topRatedFilms.map((film) => (
            <div key={`${film.id}`} className="film-card">
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
              <p>{film.title}</p>
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
              <p>{film.title}</p>
              <p>{film.popularity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
