/* const apiKey = import.meta.env.VITE_OMDB_API_KEY; */

export const searchMovies = async () => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APIKEY}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      console.error(data.Error);
      return [];
    }

    return data.Search || [];
  } catch (error) {
    console.error("Failed to fetch movies", error);
    return [];
  }
};
