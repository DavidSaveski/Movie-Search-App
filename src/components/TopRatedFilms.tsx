import { type FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";

type Props = {
  topRatedFilms: FilmType[];
};

export default function TopRatedFilmsComp({ topRatedFilms }: Props) {
  return (
    <div className="film-grid wrap">
      <h3>Top Rated Films</h3>
      <div className="film-carousel">
        {topRatedFilms.map((film) => (
          <div key={`${film.id}`} className="film-card">
            {film.poster_path ? (
              <img
                src={getImageUrl(film.poster_path, "w200")}
                alt={film.title}
                className="film-poster"
              />
            ) : (
              <div className="no-poster">No Image</div>
            )}

            <p>{film.title}</p>
            <p>{film.popularity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
