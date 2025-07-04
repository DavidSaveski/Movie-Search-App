import { useLoaderData } from "react-router-dom";
import type { FilmDetailsPlotFull } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import "../styles/FilmDetailStyle.css";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";
import { formatRuntime } from "../utils/formatRuntime";
import { formatReleaseDate } from "../utils/formatDate";

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
            <div className="title">
              <h1 style={{ margin: "0" }}>
                {filmDetails.title}
                <span>({filmDetails.release_date.split("-")[0]})</span>
              </h1>
              <div className="facts">
                <span className="release">
                  • {formatReleaseDate(filmDetails.release_date)}
                </span>
                <span className="runtime">
                  • {formatRuntime(filmDetails.runtime)}
                </span>
                <span>• {filmDetails.genre_ids}</span>
                <span></span>
              </div>
            </div>
            <div className="header-info">
              <h3>Overview</h3>
              <div>
                <p>{filmDetails.overview}</p>
              </div>
              <ol></ol>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
