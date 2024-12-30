import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen overflow-y-auto">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full p-4 z-20 flex justify-between items-center bg-black shadow-lg">
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



      <div className="animate-slideInUpWithBlur">

        {/* Image background accueil */}
        <div className="relative w-full h-[60vh] z-0">
          <img
            src="/assets/bg-movieslibrary.jpg"
            alt="image_acceuil"
            className="absolute top-0 left-0 w-full h-full object-cover z-0 mask-radial-fade opacity-45"
            style={{
              maskSize: "full",
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-inter font-bold">
              Découvrez notre catalogue des meilleurs Films et SériesTV du
              moment !
            </h2>
          </div>
        </div>

        {/* Section avec 3 divs */}
        <div className="relative w-full h-auto py-10 flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="w-[80%] sm:w-[30%] h-[200px] bg-purple-500 rounded-lg flex justify-center items-center text-white font-bold">
            Div Rouge
          </div>
          <div className="w-[80%] sm:w-[30%] h-[200px] bg-purple-500 rounded-lg flex justify-center items-center text-white font-bold">
            Div Rose
          </div>
          <div className="w-[80%] sm:w-[30%] h-[200px] bg-purple-500 rounded-lg flex justify-center items-center text-white font-bold">
            Div Jaune
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
