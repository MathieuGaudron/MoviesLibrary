import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

interface SerieDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  adult: boolean;
  number_of_seasons: number;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  episode_number: number;
  runtime: number; // Durée de l'épisode
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const DetailSerie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [serie, setSerie] = useState<SerieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  useEffect(() => {
    const fetchSerieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=fr-FR`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSerie(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch serie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSerieDetails();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!serie || selectedSeason < 1) return;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${API_KEY}&language=fr-FR`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchEpisodes();
  }, [serie, selectedSeason, id]);

  if (loading) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Chargement en cours...
      </div>
    );
  }

  if (!serie) {
    return (
      <div className="text-white text-center min-h-screen flex items-center justify-center">
        Série introuvable.
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


        {/* Details Serie */}
        <div className="w-full max-w-6xl rounded-2xl shadow-lg border border-black relative overflow-hidden mt-16 lg:mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 opacity-55"></div>
          <div className="relative flex flex-wrap lg:flex-nowrap items-center lg:items-start gap-8 p-6 sm:p-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt={`Affiche de la série ${serie.name}`}
              className="w-full lg:w-1/3 max-h-96 rounded-lg shadow-lg object-cover"
            />
            <div className="flex flex-col gap-4 w-full text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent pb-2">{serie.name}</h1>
              <p className="text-gray-400 font-bold">Date de sortie :{" "}
                {new Date(serie.first_air_date).toLocaleDateString("fr-FR", {
                  month: "2-digit",
                  year: "numeric",
                })}</p>
              <p className="text-white font-bold">{serie.overview}</p>
              <p className="text-gray-400 font-bold">
                Nombre de saisons : {serie.number_of_seasons}
              </p>
              <p className="text-amber-400 font-bold ">Note : {serie.vote_average} / 10</p>
              <p className="text-white font-bold text-sm sm:text-base flex flex-wrap justify-center gap-x-2 gap-y-1">
                  {serie.genres.map((genre, index) => (
                    <span
                      key={genre.id}
                      className="cursor-pointer hover:text-gray-300"
                      onClick={() => navigate(`/genre/${genre.id}`)}
                    >
                      {genre.name} {index < serie.genres.length - 1 && " /"}
                    </span>
                  ))}
                </p>
            </div>
          </div>
        </div>

        {/* Saison */}
        <div className="my-6 flex justify-center items-center">
          <label className="text-white font-bold mr-4" htmlFor="season-select">
            Choisissez une saison :
          </label>
          <select
            id="season-select"
            className="px-4 py-2 rounded"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
          >
            {Array.from({ length: serie.number_of_seasons }, (_, i) => i + 1).map(
              (season) => (
                <option key={season} value={season}>
                  Saison {season}
                </option>
              )
            )}
          </select>
        </div>

        {/* Episodes */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 cursor-pointer"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                Episode {episode.episode_number}: {episode.name}
              </h3>
              {episode.still_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={`épisode ${episode.name}`}
                  className="w-full max-h-64 object-cover rounded-lg mb-4"
                />
              ) : (
                <p className="text-gray-400 italic"></p>
              )}
              <p className="text-white mb-2">{episode.overview || "Pas de description disponible."}</p>
              {episode.runtime && (
                <p className="text-gray-400 font-bold">Durée : {episode.runtime} minutes</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSerie;
