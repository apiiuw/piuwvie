import { createContext, useContext, useEffect, useState } from "react";
import { fetchPopularMovies, fetchGenres } from "../api/tmdb";
import type { Movie } from "../types/movie";

interface Genre {
  id: number;
  name: string;
}

interface MovieContextType {
  movies: Movie[];
  genres: Genre[];
  addMovie: (movie: Movie) => void;
  updateMovie: (id: number, data: Partial<Movie>) => void;
  deleteMovie: (id: number) => void;
  toggleBookmark: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        let allMovies: Movie[] = [];
        const TOTAL_PAGES_TO_FETCH = 5;

        for (let i = 1; i <= TOTAL_PAGES_TO_FETCH; i++) {
          const response = await fetchPopularMovies(i);

          const moviesWithBookmark = response.results.map((movie: Movie) => ({
            ...movie,
            isBookmarked: false,
          }));

          allMovies = [...allMovies, ...moviesWithBookmark];
        }

        const genreData = await fetchGenres();

        setMovies(allMovies);
        setGenres(genreData);

      } catch (error) {
        console.error(error);
      }
    };

    loadInitial();
  }, []);

  const addMovie = (movie: Movie) => {
    setMovies(prev => [{ ...movie, isBookmarked: false }, ...prev]);
  };

  const updateMovie = (id: number, data: Partial<Movie>) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id
          ? { ...movie, ...data }
          : movie
      )
    );
  };

  const deleteMovie = (id: number) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const toggleBookmark = (id: number) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        genres,
        addMovie,
        updateMovie,
        deleteMovie,
        toggleBookmark,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used inside MovieProvider");
  }
  return context;
};