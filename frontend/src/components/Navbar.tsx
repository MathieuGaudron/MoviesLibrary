import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 max-w-full w-full p-4 z-20 flex justify-between items-center bg-black shadow-lg bg-opacity-70 backdrop-blur-md">
      {/* Logo */}
      <h1 className="text-3xl font-modak bg-gradient-to-r from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent transform transition duration-700 hover:scale-105">
        <Link to="/" className="cursor-pointer">
          MOVIES LIBRARY
        </Link>
      </h1>

      

      {/* Menu burger */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>



      {/* Liens de navigation */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:flex space-x-4 font-inter sm:space-x-4 sm:items-center sm:static sm:gap-0 absolute bg-black sm:bg-transparent top-14 sm:top-0 left-0 w-full sm:w-auto p-4 sm:p-0 z-10`}
      >
        <li className="my-2 sm:my-0">
          <Link
            to="/login"
            className="block w-full sm:w-auto text-white hover:text-gray-300 font-semibold cursor-pointer text-center sm:text-left"
          >
            Se connecter →
          </Link>
        </li>
        <li className="my-2 sm:my-0">
          <Link
            to="/signup"
            className="block w-full sm:w-auto bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold cursor-pointer text-center"
          >
            S'inscrire →
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
