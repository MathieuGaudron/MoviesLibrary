import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovie(data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };
    fetchMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movie.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movie.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-screen overflow-y-auto">

      <Navbar />

      <div className="animate-slideInUpWithBlur">

        {/* Background image */}
        <div className="relative w-full h-[75vh] z-0">
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
            <h2 className="lg:text-4xl sm:text-3xl p-3  md:text-4xl text-white font-inter font-bold">
              Découvrez notre catalogue des meilleurs Films et SériesTV du
              moment !
            </h2>
          </div>
        </div>



        <div className="mt-20">

          {/* Caroussel film populaire */}
          <div className="py-10">
            {movie.length > 0 && (
              <div className="relative w-full max-w-4xl mx-auto flex items-center">
                <div className="w-1/4 opacity-50 transform transition hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      movie[
                        (currentIndex - 1 + movie.length) % movie.length
                      ].poster_path
                    }`}
                    alt={
                      movie[
                        (currentIndex - 1 + movie.length) % movie.length
                      ].title
                    }
                    className="w-full h-[200px] object-contain rounded-lg cursor-pointer"
                    onClick={prevSlide}
                  />
                </div>
                <div className="w-2/4 relative">
                  <Link
                    to={`/movie/${movie[currentIndex].id}`}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie[currentIndex].poster_path}`}
                        alt={movie[currentIndex].title}
                        className="w-full h-[300px] object-contain transition-transform duration-500 hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white font-semibold font-inter text-xl text-center py-2">
                    {movie[currentIndex].title}
                  </div>
                </div>
                <div className="w-1/4 opacity-50 transform transition hover:scale-105">
                  <img src={`https://image.tmdb.org/t/p/w500${movie[(currentIndex + 1) % movie.length].poster_path}`}
                    alt={movie[(currentIndex + 1) % movie.length].title}
                    className="w-full h-[200px] object-contain rounded-lg cursor-pointer"
                    onClick={nextSlide}
                  />
                </div>

                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition"
                    onClick={prevSlide}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full z-10 hover:bg-opacity-80 transition"
                    onClick={nextSlide}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

              </div>
            )}
          </div>
        </div>


        <div className="relative w-full h-auto py-10 flex flex-col sm:flex-row justify-center items-center gap-28 mt-20">

          {/* 3 Div */}
          <div className="flex flex-col justify-center items-center text-center">
            <div className="text-purple-500 text-5xl mb-4">
              <i className="fas fa-film"></i> 
            </div>
            <p className="text-white text-lg font-semibold">Un divertissement <br /> sans fin.</p>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <div className="text-purple-500 text-5xl mb-4">
              <i className="fas fa-tablet-alt"></i> 
            </div>
            <p className="text-white text-lg font-semibold">Disponible sur <br /> tous vos appareils.</p>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <div className="text-purple-500 text-5xl mb-4">
              <i className="fas fa-bell"></i>
            </div>
            <p className="text-white text-lg font-semibold">Restez informés <br /> des dernières sorties.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
