import { useEffect, useRef } from "react";
import { useTVSeriesStore } from "../interface/TVSeriesInterface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../utils/imageUrlUtils";

export default function TVSeries() {
  const { TVSeriesData, fetchTVSeries } = useTVSeriesStore();
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="latest-trailers-section wrap">
      <div className="trailers-header">
        <h2 className="trailers-title">TV Series To Watch</h2>
      </div>
      <div className="trailers-carousel-container">
        <button
          className="scroll-button scroll-left"
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="trailers-carousel" ref={carouselRef}>
          {TVSeriesData.map((series) => (
            <div key={series.id} className="trailer-item">
              <div className="trailer-poster-container">
                <img
                  src={
                    series.backdrop_path
                      ? getImageUrl(series.backdrop_path, "w300")
                      : "/placeholder.svg?height=169&width=300"
                  }
                  alt={series.name}
                  width={300}
                  height={169}
                  className="trailer-poster-image"
                />
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
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
