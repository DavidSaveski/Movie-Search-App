export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) return "/placeholder-movie.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
