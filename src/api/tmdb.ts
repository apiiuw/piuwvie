import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const defaultParams = `?api_key=${API_KEY}&language=en-US`;

if (!API_KEY) {
  throw new Error("TMDB API key is missing. Check your .env file.");
}

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchPopularMovies = async (
  page: number = 1,
  minRating: number = 0
): Promise<TMDBResponse> => {
  const res = await fetch(
    `${BASE_URL}/discover/movie${defaultParams}&page=${page}&vote_average.gte=${minRating}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data = await res.json();

  return {
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};

export const fetchGenres = async () => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list${defaultParams}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await res.json();
  return data.genres;
};
