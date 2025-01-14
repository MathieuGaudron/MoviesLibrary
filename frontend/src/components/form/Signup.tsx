import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de se connecter au serveur. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[radial-gradient(circle_at_50%_0%,darkviolet_-70%,black_50%)]">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white">Inscription</h2>
        {error && <p className="text-red-500 text-lg">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-white">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Nom"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm text-white placeholder-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-white">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Adresse e-mail"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm text-white placeholder-gray-500"
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
              required
              placeholder="Mot de passe"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm text-white placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-white">
              Confirmez le mot de passe
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="Confirmez le mot de passe"
              className="bg-gray-700 w-full px-3 py-2 mt-1 rounded-md shadow-sm text-white placeholder-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-md w-full hover:bg-purple-700 mt-8"
          >
            S'inscrire
          </button>
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-200 text-lg font-semibold hover:underline">
              <span className="text-gray-400">Déjà inscrit ?</span> Connectez-vous !
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
