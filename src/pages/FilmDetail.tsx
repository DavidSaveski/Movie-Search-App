import { useLoaderData } from "react-router-dom";
import type { FilmDetailsPlotFull } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import "../styles/FilmDetailStyle.css";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";

export default function MovieDetails() {
  const filmDetails = useLoaderData<FilmDetailsPlotFull>();
  return (
    <section style={getBackgroundStyle(filmDetails)}>
      <main className="detail-container wrap">
        <div className="film-detail">
          <div className="cover-image">
            <img
              src={getImageUrl(filmDetails.poster_path, "original")}
              alt={filmDetails.title}
            />
          </div>
          <div className="description">
            <h3 style={{ margin: "0" }}>
              {filmDetails.title}
              <span>({filmDetails.release_date.split("-")[0]})</span>
            </h3>
            <p>{filmDetails.overview}</p>
          </div>
        </div>
      </main>
    </section>
  );
}
