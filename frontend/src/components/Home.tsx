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
            <h2 className="lg:text-4xl sm:text-4xl p-3  md:text-4xl text-white font-inter font-bold w-4/5">
              Découvrez notre catalogue des meilleurs Films et SériesTV du
              moment !
            </h2>
          </div>
        </div>



        <div className="mt-20">
        <div className="text-center flex flex-col justify-center items-center">
          <h3 className="lg:text-3xl sm:text-3xl p-3 font-inter md:text-3xl text-white font-bold w-4/5">
            Regardez ce que vous voulez, quand vous voulez, où vous voulez.
          </h3>
          <h4 className="text-gray-400">
            Emportez partout avec vous, vos films, séries et sagas préférés.
          </h4>
        </div>
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
              <i className="fas fa-film mb-4"></i> 
            </div>
            <p className="text-white text-2xl font-semibold">Un divertissement <br /> sans fin.</p>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <div className="text-purple-500 text-5xl mb-4">
              <i className="fas fa-tablet-alt mb-4"></i> 
            </div>
            <p className="text-white text-2xl font-semibold">Disponible sur <br /> tous vos appareils.</p>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <div className="text-purple-500 text-5xl mb-4">
              <i className="fas fa-bell mb-4"></i>
            </div>
            <p className="text-white text-2xl font-semibold">Restez informés <br /> des dernières sorties.</p>
          </div>

        </div>
        

 
      <div className="flex flex-col justify-center font-inter items-center mt-20 mb-10">
      <h3 className="text-white text-3xl font-bold mb-10">Choisissez votre abonnement</h3>

      <div className="flex flex-wrap justify-center gap-10">

        {/* Carte Basique */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-80 transform transition duration-300 hover:scale-105 flex flex-col">
          <h4 className="text-2xl font-bold mb-4">Basique</h4>
          <p className="text-purple-500 text-2xl font-bold mb-8">3,99€/mois</p>
          <ul className="list-inside mb-4 flex-grow list-none">
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Streamez sur un appareil</li>
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Aucune pub</li>
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Accès aux contenus basiques</li>
          </ul>
          <button className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:bg-purple-700 mt-auto">
            S'abonner
          </button>
        </div>

        {/* Carte Pro */}
        <div className="relative transform transition duration-300 hover:scale-105 flex flex-col">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            Le plus populaire
          </div>

          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-80 border-2 border-purple-500 flex flex-col">
            <h4 className="text-2xl font-bold mb-4">Pro</h4>
            <p className="text-purple-500 text-2xl font-bold mb-8">5,99€/mois</p>
            <ul className="list-none list-inside mb-4 flex-grow">
              <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Streamez sur 5 appareils</li>
              <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Aucune pub</li>
              <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Photo de profil animée</li>
            </ul>
            <button className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:bg-purple-700 mt-auto">
              S'abonner
            </button>
          </div>
        </div>

        {/* Carte Premium */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-80 transform transition duration-300 hover:scale-105 flex flex-col">
          <h4 className=" text-2xl font-bold mb-4">Premium</h4>
          <p className=" text-purple-500 text-2xl font-bold mb-8">9,99€/mois</p>
          <ul className="list-none list-inside mb-4 flex-grow">
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Streamez sur 10 appareils</li>
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Aucune pub</li>
            <li className="mb-2 font-semibold"> <span className="text-purple-500 mr-2">✔</span> Accès à tous les contenus</li>
          </ul>
          <button className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full w-full hover:bg-purple-700 mt-auto">
            S'abonner
          </button>
        </div>
      </div>
      </div>


      </div>
    </div>
  );
};

export default Home;
