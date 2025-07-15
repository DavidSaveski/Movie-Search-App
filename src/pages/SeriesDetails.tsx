import { useLoaderData } from "react-router-dom";
import type { TVSeriesDetails } from "../interface/TVSeriesInterface";

export default function SeriesDetails() {
  const tvSeriesDetails = useLoaderData<TVSeriesDetails>();

  return (
    <section className="wrap">
      <div>{tvSeriesDetails.name}</div>
    </section>
  );
}
