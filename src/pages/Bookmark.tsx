import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { setPageTitle } from "../utils/setPageTitle";
import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";

import Toast from "../components/feedback/Toast";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function Bookmark() {
  const { movies, toggleBookmark } = useMovies();
  const navigate = useNavigate();
  const [toastType, setToastType] = useState<"remove" | null>(null);

  useEffect(() => {
    setPageTitle("Bookmark");
  }, []);

  const bookmarkedMovies = useMemo(() => {
    return movies.filter((movie) => movie.isBookmarked);
  }, [movies]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

      <div className="relative h-[35vh] flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Your Bookmarks 🔖
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            {bookmarkedMovies.length > 0
              ? `You have ${bookmarkedMovies.length} saved movies`
              : "No movies saved yet"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {bookmarkedMovies.length === 0 ? (
          <div className="text-center py-24">

            <div className="flex justify-center mb-8">
              <div
                className="
                  w-24 h-24
                  flex items-center justify-center
                  rounded-full
                  bg-red-100 dark:bg-red-900/30
                  shadow-lg
                  animate-float
                "
              >
                <BookmarkIcon
                  size={42}
                  className="text-red-600"
                />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              No Bookmarks Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Start exploring movies and save your favorites to see them here.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {bookmarkedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="
                relative cursor-pointer rounded-2xl
                transition-transform duration-200
                hover:-translate-y-2
              "
            >

              <div className="relative rounded-2xl overflow-hidden group">

                <img
                  src={`${POSTER_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  className="
                    w-full h-80 object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute inset-0
                    bg-black/10
                    group-hover:bg-black/60
                    transition-all duration-500
                  "
                />

                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <h3
                    className="
                      text-white font-bold text-lg
                      opacity-90 group-hover:opacity-100
                      transition duration-300
                      drop-shadow-lg
                    "
                  >
                    {movie.title}
                  </h3>
                </div>

              </div>

              <div className="absolute top-4 right-4 z-30 group">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(movie.id);
                    setToastType("remove");
                  }}
                  className="
                    bg-white/95 dark:bg-gray-800/95
                    p-2 rounded-full
                    shadow-xl
                    transition-transform duration-200
                    hover:scale-110 active:scale-95
                  "
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>

                <div
                  className="
                    absolute -top-12 left-1/2 -translate-x-1/2
                    flex flex-col items-center
                    opacity-0 scale-95
                    group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                    transition-all duration-200 delay-150
                    pointer-events-none
                  "
                >
                  <div
                    className="
                      px-3 py-1.5
                      text-xs font-medium
                      rounded-lg
                      shadow-lg
                      whitespace-nowrap
                      dark:bg-white dark:text-gray-900
                      bg-gray-900 text-white
                    "
                  >
                    Remove Bookmark
                  </div>

                  <div
                    className="
                      w-2 h-2
                      rotate-45
                      -mt-1
                      dark:bg-white
                      bg-gray-900
                    "
                  />
                </div>

              </div>

            </div>

            ))}

          </div>
        )}
      </div>

      {toastType && (
        <Toast
          show={true}
          type="remove"
          onClose={() => setToastType(null)}
        />
      )}

    </div>
  );
}