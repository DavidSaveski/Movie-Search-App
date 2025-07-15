import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../utils/imageUrlUtils";
import { useTVSeriesStore } from "../zustand/TVSeriesStore";
import { Link, useNavigate } from "react-router-dom";

export default function TVSeries() {
  const { TVSeriesData, fetchTVSeries } = useTVSeriesStore();
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTVSeries();
  }, [fetchTVSeries]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };
  const handleScrollClick = (
    direction: "left" | "right",
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();
    scrollCarousel(direction);
  };
  const handleSeriesClick = (seriesId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/tv/${seriesId}`);
  };

  return (
    <section className="latest-trailers-section wrap">
      <div className="trailers-header">
        <h2 className="trailers-title">TV Series To Watch</h2>
      </div>
      <div className="trailers-carousel-container">
        <button
          className="scroll-button scroll-left"
          onClick={(e) => handleScrollClick("left", e)}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="trailers-carousel" ref={carouselRef}>
          {TVSeriesData.map((series) => (
            <div key={series.id} className="trailer-item">
              <div
                className="trailer-poster-container"
                onClick={(e) => handleSeriesClick(series.id, e)}
              >
                <div>
                  <img
                    src={getImageUrl(series.backdrop_path, "w300")}
                    alt={series.name}
                    className="trailer-poster-image"
                  />
                </div>
                <div className="trailer-info-overlay">
                  <h3 className="movie-title">{series.name}</h3>
                  <p className="trailer-name">Official Trailer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="scroll-button scroll-right"
          onClick={(e) => handleScrollClick("right", e)}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
