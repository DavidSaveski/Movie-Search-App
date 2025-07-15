import { useEffect } from "react";
import { useFilmStore } from "../zustand/FilmStore";
import FilmList from "../components/FilmList";
import TopRatedFilmsComp from "../components/TopRatedFilms";
import Trailers from "../components/LatestTrailers";
import TVSeries from "../components/TVSeries";

export default function HomePage() {
  const {
    popularFilms,
    topRatedFilms,
    error,
    fetchPopularFilms,
    fetchTopRatedFilms,
  } = useFilmStore();

  useEffect(() => {
    fetchPopularFilms();
    fetchTopRatedFilms();
  }, [fetchPopularFilms, fetchTopRatedFilms]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <FilmList popularFilms={popularFilms} />
      <Trailers popularFilms={popularFilms} />
      <TopRatedFilmsComp topRatedFilms={topRatedFilms} />
      <TVSeries />
    </>
  );
}
