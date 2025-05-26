import { useLoaderData } from "react-router-dom";
import type { FilmDetailsPlotFull } from "../interface/FilmInterface";

export default function MovieDetails() {
  const filmDetails = useLoaderData<FilmDetailsPlotFull>();

  return (
    <>
      <div>MovieDetails for id: {filmDetails.title}</div>
      <pre>{JSON.stringify(filmDetails, null, 4)}</pre>
    </>
  );
}
