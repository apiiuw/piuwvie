import { Link } from "react-router-dom";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-8xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img src="/img/icon/Icon.png" alt="PiuwVie Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                PiuwVie
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Discover popular movies, explore genres, and save your favorites.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {[
                { label: "Home", to: "/" },
                { label: "Bookmark", to: "/bookmark" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-red-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
              Credits
            </h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Built with ❤️ using TMDB API.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Crafted by <span className="text-red-600">Rafi Rizqallah Andila</span>
            </p>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
          © {year} PiuwVie. Designed & Developed by{" "}
          <span className="text-red-600 font-medium">
            Rafi Rizqallah Andila
          </span>.
        </div>
      </div>
    </footer>
  );
}