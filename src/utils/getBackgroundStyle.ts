import type { FilmType } from "../interface/FilmInterface";
import { getImageUrl } from "./imageUrlUtils";

export function getBackgroundStyle(
  film: FilmType | undefined,
  isNext?: boolean,
  isTransitioning?: boolean
): React.CSSProperties {
  if (!film) return { backgroundColor: "lightcoral" };

  const imagePath = film.backdrop_path;
  if (imagePath) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 50, 100, 0.6), rgba(0, 30, 80, 0.6)), url(${getImageUrl(
        imagePath,
        "original"
      )})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: isNext ? (isTransitioning ? 1 : 0) : isTransitioning ? 0 : 1,
      transition: "opacity 1s ease-in-out",
    };
  }

  return { backgroundColor: "lightcoral" };
}
