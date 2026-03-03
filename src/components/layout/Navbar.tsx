import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import { fetchGenres } from "../../api/tmdb";
import { Home, Bookmark, Film, Sun, Moon, Menu, X, Plus } from "lucide-react";

interface GenreType {
  id: number;
  name: string;
}

interface Props {
  selectedGenre: GenreType | null;
  onGenreChange: (genre: GenreType | null) => void;
}

export default function Navbar({
  selectedGenre,
  onGenreChange,
}: Props) {
    
  const location = useLocation();
  const navigate = useNavigate();
  const { movies } = useMovies();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [openGenre, setOpenGenre] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomeActive = location.pathname === "/";
  const isBookmarkActive = location.pathname === "/bookmark";
  const isCreateActive = location.pathname === "/create";
  const isGenreActive = location.pathname === "/" && selectedGenre !== null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const loadGenres = async () => {
      const allGenres = await fetchGenres();

      const movieGenreIds = new Set(
      movies.flatMap((movie) => movie.genre_ids)
      );

      const filteredGenres = allGenres.filter((genre: GenreType) =>
      movieGenreIds.has(genre.id)
      );

      setGenres(filteredGenres);
  };

  if (movies.length) {
      loadGenres();
  }
  }, [movies]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleGenreSelect = (genre: GenreType | null) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { selectedGenre: genre } });
    } else {
      onGenreChange(genre);
    }

    setOpenGenre(false);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-md bg-white/10 dark:bg-black/20"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-8xl mx-auto px-6 py-2 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <img
            src="/img/icon/Icon.png"
            alt="PiuwVie Logo"
            className="h-12 w-auto"
          />
          <span
            className={`font-bold text-lg ${
              scrolled ? "text-[#fe717a]" : "text-white"
            }`}
          >
            PiuwVie
          </span>
        </div>

        <div className="flex items-center gap-4">

          <div
            className={`hidden md:flex gap-6 ${
              scrolled ? "text-red-500 font-semibold" : "text-white"
            }`}
          >
            <Link to="/"
            className={`
            flex items-center gap-1
            ${
            isHomeActive
                ? "border-red-600 text-red-600 font-semibold border-b"
                : scrolled
                ? "hover:border-red-700 hover:text-red-700"
                : "hover:border-red-500 hover:text-red-500"
            }
            `}>
              <Home size={18} />
              Home
            </Link>

        <div className="relative">
        <button
            onClick={() => setOpenGenre(!openGenre)}
            className={`
            flex items-center gap-1 transition
            ${
            isGenreActive
                ? "border-red-600 text-red-600 font-semibold border-b"
                : scrolled
                ? "hover:border-red-700 hover:text-red-700"
                : "hover:border-red-500 hover:text-red-500"
            }
            `}>
            <Film size={18} />
            Genre
        </button>

        {openGenre && (
            <div
            className={`
                absolute mt-2 w-48 rounded-lg shadow-lg max-h-60 overflow-y-auto
                transition-all duration-200
                ${
                scrolled
                    ? "bg-white dark:bg-gray-900"
                    : "backdrop-blur-md bg-white/20 dark:bg-black/30"
                }
            `}
            >
            <button
                onClick={() => {
                handleGenreSelect(null);
                setOpenGenre(false);
                }}
                className={`
                block w-full text-left px-4 py-2 transition
                ${
                selectedGenre === null
                    ? "bg-red-100 dark:bg-red-900 text-red-600 font-semibold"
                    : scrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-white/30 dark:hover:bg-black/40"
                }
                `}
            >
                All
            </button>

            {genres.map((genre) => (
                <button
                key={genre.id}
                onClick={() => {
                    handleGenreSelect({ id: genre.id, name: genre.name });
                    setOpenGenre(false);
                }}
                className={`
                block w-full text-left px-4 py-2 transition
                ${
                selectedGenre?.id === genre.id
                    ? "bg-red-100 dark:bg-red-900 text-red-600 font-semibold"
                    : scrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-white/30 dark:hover:bg-black/40"
                }
                `}
                >
                {genre.name}
                </button>
            ))}
            </div>
        )}
        </div>

            <Link
            to="/bookmark"
            className={`
            flex items-center gap-1
            ${
                isBookmarkActive
                ? "border-red-600 text-red-600 font-semibold border-b"
                : scrolled
                    ? "hover:border-red-700 hover:text-red-700"
                    : "hover:border-red-500 hover:text-red-500"
            }
            `}
            >
              <Bookmark size={18} />
              Bookmark
            </Link>

            <Link
              to="/create"
              className={`
                flex items-center gap-1
                ${
                  isCreateActive
                    ? "border-red-600 text-red-600 font-semibold border-b"
                    : scrolled
                    ? "hover:border-red-700 hover:text-red-700"
                    : "hover:border-red-500 hover:text-red-500"
                }
              `}
            >
              <Plus size={18} />
              Create Film
            </Link>

          </div>

          <button
            onClick={toggleTheme}
            className={`
              relative w-14 h-8 flex items-center rounded-full px-1 transition-all duration-300
              ${darkMode ? "bg-gray-800" : "bg-gray-300"}
            `}
          >
            <div
              className={`
                w-6 h-6 bg-white rounded-full shadow-md 
                flex items-center justify-center
                transform transition-all duration-300
                ${darkMode ? "translate-x-6" : "translate-x-0"}
              `}
            >
              {darkMode ? (
                <Moon size={14} className="text-gray-700" />
              ) : (
                <Sun size={14} className="text-yellow-500" />
              )}
            </div>
          </button>

            <button
            className="md:hidden text-[#fe717a]"
            onClick={() => setMobileOpen(!mobileOpen)}
            >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

        </div>
      </div>
        {mobileOpen && (
        <div className="md:hidden w-full bg-white dark:text-white text-gray-600 dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg border-t dark:border-gray-700">
            <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block font-medium ${
                isHomeActive
                ? "text-red-600 font-semibold"
                : ""
            }`}
            >
            Home
            </Link>

            <button
            onClick={() => setOpenGenre(!openGenre)}
            className="block w-full text-left font-medium"
            >
            Genre
            </button>

            {openGenre && (
            <div className="mt-2 ml-4 space-y-2">

                <button
                onClick={() => {
                    handleGenreSelect(null);
                    setOpenGenre(false);
                    setMobileOpen(false);
                }}
                className="block w-full text-left text-sm"
                >
                All
                </button>

                {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => {
                    handleGenreSelect({ id: genre.id, name: genre.name });
                    setOpenGenre(false);
                    setMobileOpen(false);
                    }}
                    className={`block w-full text-left text-sm ${
                    selectedGenre?.id === genre.id
                        ? "text-red-600 font-semibold"
                        : ""
                    }`}
                >
                    {genre.name}
                </button>
                ))}

            </div>
            )}

            <Link
            to="/bookmark"
            onClick={() => setMobileOpen(false)}
            className={`block font-medium ${
                isBookmarkActive
                ? "text-red-600 font-semibold"
                : ""
            }`}
            >
            Bookmark
            </Link>

            <Link
              to="/create"
              onClick={() => setMobileOpen(false)}
              className={`block font-medium ${
                isCreateActive
                  ? "text-red-600 font-semibold"
                  : ""
              }`}
            >
              Create Film
            </Link> 
        </div>
        )}
    </nav>
  );
}