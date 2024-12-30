import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full p-4 z-10 flex justify-between items-center bg-black shadow-lg">
      <h1 className="text-3xl font-modak bg-gradient-to-r from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent transform transition duration-700 hover:scale-105">
        <Link to="/" className="cursor-pointer">
          MOVIES LIBRARY
        </Link>
      </h1>
      <ul className="flex space-x-4 font-inter">
        <li>
          <Link
            to="/login"
            className="text-white hover:text-gray-300 font-semibold cursor-pointer"
          >
            Se connecter →
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-500 rounded-full font-semibold cursor-pointer"
          >
            S'inscrire →
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
