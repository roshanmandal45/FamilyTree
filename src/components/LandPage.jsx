import { useState } from "react";

export default function LandingPage({ onContinue }) {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            मण्डल परिवारमा स्वागत छ
          </h1>
          <p className="text-gray-600 text-sm">
            तपाईंको नाम प्रविष्ट गरेर मण्डल परिवार हेर्न सक्नुहुन्छ। धन्यवाद
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="तपाईंको नाम..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          
          <button
            onClick={() => name.trim() && onContinue(name)}
            disabled={!name.trim()}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            जारी राख्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
}