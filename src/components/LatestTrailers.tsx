import "../styles/TrailersStyle.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useFilmStore } from "../zustand/FilmStore";
import { getImageUrl } from "../utils/imageUrlUtils";
import type { FilmType, TrailerType } from "../interface/FilmInterface";
import { formatReleaseDate } from "../utils/formatDate";

type Props = {
  popularFilms: FilmType[];
};

interface TrailerWithMovie extends TrailerType {
  filmTitle: string;
}

export default function LatestTrailers({ popularFilms }: Props) {
  const { trailers, loading, error, fetchFilmTrailers } = useFilmStore();

  const [selectedTrailer, setSelectedTrailer] =
    useState<TrailerWithMovie | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingFilm, setPendingFilm] = useState<FilmType | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const limitedFilms = useMemo(() => {
    const seen = new Set<number>();
    const uniqueFilms = popularFilms.filter((film) => {
      if (seen.has(film.id)) {
        return false;
      }
      seen.add(film.id);
      return true;
    });

    return uniqueFilms.slice(0, 15);
  }, [popularFilms]);

  useEffect(() => {}, [popularFilms.length]);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateScrollButtons();

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateScrollButtons);
      return () => carousel.removeEventListener("scroll", updateScrollButtons);
    }
  }, [limitedFilms]);

  useEffect(() => {
    if (pendingFilm && trailers.length > 0) {
      const officialTrailer =
        trailers.find(
          (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
        ) ||
        trailers.find((trailer) => trailer.site === "YouTube") ||
        trailers[0];

      if (officialTrailer) {
        const trailerWithMovie: TrailerWithMovie = {
          ...officialTrailer,
          filmTitle: pendingFilm.title,
        };
        setSelectedTrailer(trailerWithMovie);
        setShowModal(true);
      }
      setPendingFilm(null);
    }
  }, [trailers, pendingFilm]);

  const handleTrailerClick = async (film: FilmType) => {
    setSelectedTrailer(null);
    setShowModal(false);
    setPendingFilm(film);

    try {
      await fetchFilmTrailers(film.id);
    } catch (error) {
      console.error("Failed to fetch trailers:", error);
      setPendingFilm(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTrailer(null);
    setPendingFilm(null);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const scrollAmount = 320;
    const currentScroll = carousel.scrollLeft;

    let targetScroll: number;

    if (direction === "left") {
      targetScroll = Math.max(0, currentScroll - scrollAmount);
    } else {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      targetScroll = Math.min(maxScroll, currentScroll + scrollAmount);
    }

    carousel.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const getYouTubeEmbedUrl = (key: string): string => {
    return `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
  };

  if (loading) {
    return (
      <div className="loading-container wrap">
        <div className="loading-spinner"></div>
        <p>Loading trailers...</p>
      </div>
    );
  }

  return (
    <section className="latest-trailers-section wrap">
      <div className="trailers-header">
        <h2 className="trailers-title">Latest Trailers</h2>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="trailers-carousel-container">
        <button
          className={`scroll-button scroll-left ${
            !canScrollLeft ? "disabled" : ""
          }`}
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          className="trailers-carousel"
          ref={carouselRef}
          onScroll={updateScrollButtons}
        >
          {limitedFilms.map((film: FilmType) => (
            <div
              key={film.id}
              className="trailer-item"
              onClick={() => handleTrailerClick(film)}
            >
              <div className="trailer-poster-container">
                <img
                  src={
                    film.backdrop_path
                      ? getImageUrl(film.backdrop_path, "w300")
                      : "/placeholder.svg?height=169&width=300"
                  }
                  alt={film.title}
                  width={300}
                  height={169}
                  className="trailer-poster-image"
                />
                <div className="play-overlay">
                  <div className="play-button">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="trailer-info-overlay">
                  <h3 className="movie-title">{film.title}</h3>
                  <p className="trailer-name">
                    {formatReleaseDate(film.release_date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`scroll-button scroll-right ${
            !canScrollRight ? "disabled" : ""
          }`}
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedTrailer && (
        <div className="trailer-modal" onClick={closeModal}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <h3>{selectedTrailer.filmTitle}</h3>
              <p>{selectedTrailer.name}</p>
            </div>
            <div className="video-container">
              <iframe
                src={getYouTubeEmbedUrl(selectedTrailer.key)}
                title={selectedTrailer.name}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
