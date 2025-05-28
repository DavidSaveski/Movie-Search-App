import { useLoaderData } from "react-router-dom";
import type { FilmDetailsPlotFull } from "../interface/FilmInterface";
import { getImageUrl } from "../utils/imageUrlUtils";

export default function MovieDetails() {
  const filmDetails = useLoaderData<FilmDetailsPlotFull>();

  return (
    <div className="Films">
      <div className="film-detail">
        <div>
          <img
            src={getImageUrl(filmDetails.poster_path, "original")}
            alt="Thunderbolts"
          />
        </div>
        <div>
          <h3 style={{ margin: "0" }}>{filmDetails.title}</h3>
        </div>
      </div>
    </div>
  );
}
