import { useState } from "react";

export default function LandingPage({ onContinue }) {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Family Tree App</h1>
      <p className="mb-4 text-gray-300">Enter your name to continue</p>
      <input
        type="text"
        placeholder="Your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-xl text-black w-72 mb-4 focus:outline-none"
      />
      <button
        onClick={() => name.trim() && onContinue(name)}
        className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
      >
        Continue
      </button>
    </div>
  );
}