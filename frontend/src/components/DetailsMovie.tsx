import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult: boolean;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const DetailsMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Chargement en cours...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Film introuvable.
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-y-auto">
      <Navbar />
      <div className="p-4 sm:p-8 min-h-screen flex flex-col items-center justify-center font-sans relative">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 sm:top-4 sm:left-4 z-40">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg absolute left-1/2 transform -translate-x-1/2 sm:left-4 sm:translate-x-5 sm:translate-y-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="white"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>

        <div className="w-full max-w-6xl rounded-2xl shadow-lg border border-black relative overflow-hidden mt-16 lg:mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 opacity-55"></div>
          <div className="relative flex flex-wrap lg:flex-nowrap items-center lg:items-start gap-8 p-6 sm:p-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Affiche du film ${movie.title}`}
              className="w-full lg:w-1/3 max-h-96 rounded-lg shadow-lg object-cover"
            />

            <div className="flex flex-col gap-4 w-full text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent pb-2">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base font-bold">
                Date de sortie :{" "}
                {new Date(movie.release_date).toLocaleDateString("fr-FR", {
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-white text-sm sm:text-base">
                {movie.overview}
              </p>

              <p className="text-amber-400 text-sm sm:text-base font-semibold flex justify-center items-center gap-2 mt-4">
                <span className="bg-amber-400 px-2 py-1 text-black rounded-full font-bold">
                  Note :
                </span>
                {movie.vote_average} / 10
              </p>

              {movie.adult && (
                <p className="text-red-500 font-bold text-sm sm:text-base text-center">
                  Film classé pour adulte
                </p>
              )}

              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
                <h3 className="bg-black px-3 py-1 rounded-full text-white font-bold text-sm sm:text-base">
                  Genres :
                </h3>
                <p className="text-white font-bold text-sm sm:text-base flex flex-wrap justify-center gap-x-2 gap-y-1">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={genre.id}
                      className="cursor-pointer hover:text-gray-300"
                      onClick={() => navigate(`/genre/${genre.id}`)}
                    >
                      {genre.name} {index < movie.genres.length - 1 && " /"}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMovie;
