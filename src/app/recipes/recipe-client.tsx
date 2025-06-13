'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RecipeList from './recipe-list';
import Link from 'next/link';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function RecipeClientPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const maxReadyTime = searchParams.get('maxReadyTime') || '';

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query && !cuisine && !maxReadyTime) return;

    const fetchRecipes = async () => {
      setLoading(true);
      setError(false);

      try {
        const params = new URLSearchParams();
        if (query) params.set('query', query);
        if (cuisine) params.set('cuisine', cuisine);
        if (maxReadyTime) params.set('maxReadyTime', maxReadyTime);
        params.set('apiKey', process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY!);

        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
        );

        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setRecipes(data.results || []);
      } catch (err) {
        console.error(err)
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, cuisine, maxReadyTime]);

  if (!query && !cuisine && !maxReadyTime) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-500 text-lg">
          Please enter at least one search filter.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-8 text-center drop-shadow-sm">
          {loading ? 'Loading recipes...' : `Found ${recipes.length} recipe(s)`}
        </h1>

        {error && (
          <p className="text-center text-red-500">Failed to fetch recipes. Try again later.</p>
        )}

        {!loading && <RecipeList recipes={recipes} />}
        
        <Link
          href="/"
          className="inline-block mt-8 text-blue-600 hover:underline"
        >
          ← Back to search
        </Link>
      </div>
    </main>
  );
}
