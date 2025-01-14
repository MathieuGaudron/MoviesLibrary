import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        // console.log("Connexion réussie. Token :", data.token);
        navigate("/");
      } else {
        setError(data.message || "Erreur lors de la connexion.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_50%_0%,darkviolet_-70%,black_50%)]">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">Connexion</h2>
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Adresse e-mail"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm focus:outline-none text-white focus:ring-white focus:border-white text-lg placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-white">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Mot de passe"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm focus:outline-none text-white focus:ring-white focus:border-white text-lg placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-purple-700 mt-8"
            >
              Se connecter
            </button>
            
            <div className="text-center mt-4">
              <Link to="/signup" className="text-gray-200 text-lg font-semibold hover:underline">
                <span className="text-gray-400">Pas encore inscris ?</span> Inscrivez-vous !
              </Link>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
