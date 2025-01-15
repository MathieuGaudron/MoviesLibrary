import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult: boolean;
}

interface Genre {
  id: number;
  name: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const Genres: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
    fetchMoviesByGenre();
  }, [id]);

  const genreName =
    genres.find((genre) => genre.id === Number(id))?.name || "Inconnu";

  if (loading) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Chargement en cours...
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-y-auto">
      <Navbar />
      <div className="p-8 min-h-screen font-sans">
        <h1 className="text-white text-2xl font-bold mb-4">
          Catalogue des films {genreName}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
                  <h2 className="text-lg font-semibold truncate">
                    {movie.title}
                  </h2>
                  <p className="text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
