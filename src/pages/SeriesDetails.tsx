import { useLoaderData } from "react-router-dom";
import type { TVSeriesSearchResult } from "../interface/TVSeriesInterface";

export default function SeriesDetails() {
  const tvSeriesDetails = useLoaderData<TVSeriesSearchResult>();

  return (
    <section className="wrap">
      <div>{tvSeriesDetails.name}</div>
    </section>
  );
}
