import { useLoaderData } from "react-router-dom";
import type { FilmDetailsPlotFull } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";
import "../styles/FilmDetailStyle.css";
import { getBackgroundStyle } from "../utils/getBackgroundStyle";

export default function MovieDetails() {
  const filmDetails = useLoaderData<FilmDetailsPlotFull>();
  return (
    <section className="" style={getBackgroundStyle(filmDetails)}>
      <main className="detail-container wrap">
        <div className="film-detail">
          <div className="cover-image">
            <img
              src={getImageUrl(filmDetails.poster_path, "w500")}
              alt={filmDetails.title}
            />
          </div>
          <div className="description">
            <h3 style={{ margin: "0" }}>{filmDetails.title}</h3>
          </div>
        </div>
      </main>
    </section>
  );
}
