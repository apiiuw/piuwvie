import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { setPageTitle } from "../utils/setPageTitle";
import { useMovies } from "../context/MovieContext";

import MovieCard from "../components/movie/MovieCard";
import HeroCarousel from "../components/movie/HeroCarousel";
import Toast from "../components/feedback/Toast";

interface GenreType {
  id: number;
  name: string;
}

interface Props {
  selectedGenre: GenreType | null;
  onGenreChange: (genre: GenreType | null) => void;
}

function Home({ selectedGenre, onGenreChange }: Props) {
  const { movies } = useMovies();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [ratingFilter, setRatingFilter] = useState<number>(0);

  const [toastType, setToastType] = useState<"create" | null>(null);

  useEffect(() => {
    if (location.state?.selectedGenre !== undefined) {
      onGenreChange(location.state.selectedGenre);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.created) {
      setToastType("create");

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    setPageTitle();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedGenre]);

    useEffect(() => {
    setPage(1);
    }, [search, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (selectedGenre) {
    result = result.filter((movie) =>
        movie.genre_ids?.includes(selectedGenre.id)
    );
    }

    if (search) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "rating_desc") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "rating_asc") {
      result.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortBy === "title_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (ratingFilter > 0) {
    result = result.filter(
        (movie) => movie.vote_average >= ratingFilter
    );
    }

    return result;
  }, [movies, search, sortBy, selectedGenre, ratingFilter]);

    const ITEMS_PER_PAGE = 8;

    const totalResults = filteredMovies.length;
    const totalPages = Math.max(
    1,
    Math.ceil(totalResults / ITEMS_PER_PAGE)
    );

    const paginatedMovies = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMovies.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredMovies, page]);

    if (!movies.length) {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-gray-50 dark:bg-gray-900 transition">

        <img
            src="/img/icon/Icon.png"
            alt="PiuwVie Logo"
            className="w-20 h-20 animate-pulse"
        />

        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>

        <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">
            Loading Awesome Movies...
        </p>

        </div>
    );
    }

  return (
    <div className="text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900 transition">
      <HeroCarousel
        movies={
          filteredMovies.length > 0
            ? filteredMovies.slice(0, 5)
            : movies.slice(0, 5)
        }
      />

      <section className="p-8 space-y-6">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {selectedGenre
            ? `${selectedGenre.name} Movies 🎬`
            : "Popular Movies 🎬"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg border dark:bg-gray-800 border-red-600"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 rounded-lg border dark:bg-gray-800 border-red-600"
          >
            <option value="default">Sort By</option>
            <option value="rating_desc">Rating (High → Low)</option>
            <option value="rating_asc">Rating (Low → High)</option>
            <option value="title_asc">Title (A-Z)</option>
          </select>

        <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Minimum Rating: 
            <span className="ml-2 font-semibold text-red-600">
            ⭐ {ratingFilter.toFixed(1)}
            </span>
        </label>

        <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={ratingFilter}
            onChange={(e) => {
            setRatingFilter(Number(e.target.value));
            setPage(1);
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        </div>

        <div className="flex items-center justify-center md:justify-end font-semibold">
        Found {paginatedMovies.length} of {filteredMovies.length} movies
        </div>

        </div>

        {filteredMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">

            <img
            src="/img/icon/Icon.png"
            alt="PiuwVie Logo"
            className="w-24 h-24 opacity-60"
            />

            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            No Movies Found 🎬
            </h3>

            <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Try adjusting your search, rating, or filter genre.
            </p>

            <button
            onClick={() => {
            setSearch("");
            setRatingFilter(0);
            setSortBy("default");
            setPage(1);
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
            Reset Filters
            </button>

        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {paginatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        )}

        {filteredMovies.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">

            <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
            Previous
            </button>

            <span className="font-semibold">
            Page {page} of {totalPages}
            </span>

            <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
            Next
            </button>

        </div>
        )}

      </section>

      {toastType && (
        <Toast
          show={true}
          type="success"
          onClose={() => setToastType(null)}
        />
      )}

    </div>
  );
}

export default Home;