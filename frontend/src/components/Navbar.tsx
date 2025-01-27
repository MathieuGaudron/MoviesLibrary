import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 max-w-full w-full p-4 z-50 bg-black shadow-lg bg-opacity-70 backdrop-blur-md">
      {/* Desktop */}
      <div className="hidden sm:flex justify-between items-center">
        <h1 className="text-3xl font-modak bg-gradient-to-r from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent transform transition duration-500 hover:scale-105">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === "/") {
                window.location.reload();
              }
            }}
          >
            MOVIES LIBRARY
          </Link>
        </h1>

        <ul className="flex space-x-16 font-inter text-lg">
          <li className="text-white font-bold transform transition duration-300 hover:scale-110">
            <Link
              to="/movies"
              onClick={() => {
                if (location.pathname === "/movies") {
                  window.location.reload();
                }
              }}
            >
              Film
            </Link>
          </li>
          <li className="text-white font-bold transform transition duration-300 hover:scale-110">
            <Link
              to="/series"
              onClick={() => {
                if (location.pathname === "/series") {
                  window.location.reload();
                }
              }}
            >
              Série TV
            </Link>
          </li>
          <li className="text-white font-bold transform transition duration-300 hover:scale-110">
            <Link
              to="/genres"
              onClick={() => {
                if (location.pathname === "/genres") {
                  window.location.reload();
                }
              }}
            >
              Genres
            </Link>
          </li>
        </ul>

        <div>
          {username ? (
            <>
              <span className="text-white font-semibold mr-4">
                Bonjour, {username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold cursor-pointer"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 font-semibold mr-4"
              >
                Se connecter →
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold cursor-pointer"
              >
                S'inscrire →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden justify-between items-center">
        <h1 className="text-2xl font-modak bg-gradient-to-r cursor-pointer from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent  transform transition duration-500 hover:scale-105">
          <Link to="/" className="cursor-pointer">
            MOVIES LIBRARY
          </Link>
        </h1>

        {/* User Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none hover:text-purple-500  transform transition duration-500 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 0116 0H4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden mt-4 bg-black bg-opacity-10 p-4 rounded-md`}
      >
        <li className="text-white font-bold flex justify-center mb-4 transform transition duration-300 hover:scale-110">
          <Link
            to="/movies"
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname === "/movies") {
                window.location.reload();
              }
            }}
          >
            Film
          </Link>
        </li>
        <li className="text-white font-bold mb-4 flex justify-center transform transition duration-300 hover:scale-110">
          <Link
            to="/series"
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname === "/series") {
                window.location.reload();
              }
            }}
          >
            Séries TV
          </Link>
        </li>
        <li className="text-white font-bold mb-4 flex justify-center transform transition duration-300 hover:scale-110">
          <Link
            to="/genres"
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname === "/genres") {
                window.location.reload();
              }
            }}
          >
            Genres
          </Link>
        </li>

        {username ? (
          <>
            <li className="text-white font-semibold mt-16 mb-4 flex justify-center">
              Bonjour, {username}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold text-center"
              >
                Se déconnecter
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="mb-4 mt-16">
              <Link
                to="/login"
                className="block w-full text-white hover:text-gray-300 font-semibold text-center"
              >
                Se connecter →
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block w-full bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold text-center"
              >
                S'inscrire →
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
