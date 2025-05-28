import { useEffect } from "react";
import { useFilmStore } from "../zustand/MovieStore";
import FilmList from "../components/FilmList";
import TopRatedFilmsComp from "../components/TopRatedFilms";
import Trailers from "../components/Trailers";

export default function HomePage() {
  const {
    popularFilms,
    topRatedFilms,
    loading,
    error,
    fetchPopularMovies,
    fetchTopRatedFilms,
  } = useFilmStore();

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedFilms();
  }, [fetchPopularMovies, fetchTopRatedFilms]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <FilmList popularFilms={popularFilms} />
      <Trailers />
      <TopRatedFilmsComp topRatedFilms={topRatedFilms} />
    </>
  );
}
