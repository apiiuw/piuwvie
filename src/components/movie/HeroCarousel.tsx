import { useEffect, useMemo, useState } from "react";
import type { Movie } from "../../types/movie";

interface HeroCarouselProps {
  movies: Movie[];
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroMovies = useMemo(() => movies.slice(0, 5), [movies]);

  useEffect(() => {
    if (!heroMovies.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroMovies]);

  if (!heroMovies.length) return null;

  return (
    <section className="relative h-[50vh] overflow-hidden">
      {heroMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {movie.backdrop_path && (
            <img
              src={`${IMAGE_BASE}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-16 w-full px-4 sm:px-8 md:px-16 text-white">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 text-red-600">
                {movie.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-3 md:line-clamp-none">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div
        className="
          absolute
          bottom-6
          left-1/2 -translate-x-1/2
          md:left-auto md:translate-x-0 md:right-12 md:bottom-8
          flex gap-2 z-20
        "
      >
        {heroMovies.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-110"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;