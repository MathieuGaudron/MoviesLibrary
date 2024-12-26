import React, { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error(`error : ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-8 min-h-screen flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer w-60"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 ">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <p className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
