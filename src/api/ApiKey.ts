const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export const searchAllMovies = async (searchTerm: string) => {
  try {
    const firstResponse = await fetch(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&page=1`
    );
    const firstData = await firstResponse.json();

    if (firstData.Response === "False") {
      console.error(firstData.Error);
      return [];
    }

    const totalResults = parseInt(firstData.totalResults, 10);
    const totalPages = Math.ceil(totalResults / 10);

    let allMovies = [...firstData.Search];

    for (let page = 2; page <= totalPages; page++) {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        allMovies = [...allMovies, ...data.Search];
      }
    }

    return allMovies;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    return [];
  }
};
