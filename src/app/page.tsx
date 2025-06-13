'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [prepTime, setPrepTime] = useState('');

  const handleNext = () => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (prepTime) params.append('maxReadyTime', prepTime);

    router.push(`/recipes?${params.toString()}`);
  };

  const isDisabled = !query && !cuisine && !prepTime;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-pink-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 drop-shadow">
          Find Your Next Recipe
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Search by keyword, cuisine, or max prep time
        </p>

        <div className="space-y-4">
          <input
            type="text"
            aria-label="Search recipe"
            placeholder="e.g. pasta, salad, curry..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500"
          />

          <select
            aria-label="Select cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-500"
          >
            <option value="">Select a cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
          </select>

          <input
            type="number"
            aria-label="Max preparation time"
            placeholder="Max prep time (minutes)"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-500"
            min={0}
          />
        </div>

        <button
          disabled={isDisabled}
          onClick={handleNext}
          className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
            isDisabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-600 shadow-md'
          }`}
          aria-disabled={isDisabled}
        >
          Find Recipes
        </button>
      </div>
    </main>
  );
}
