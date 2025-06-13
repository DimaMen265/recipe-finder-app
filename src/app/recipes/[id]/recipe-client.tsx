'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RecipeDetails {
  title: string;
  extendedIngredients: { original: string }[];
  readyInMinutes: number;
  servings: number;
  summary: string;
}

export default function RecipeDetailClient() {
  const { id } = useParams();
  const [data, setData] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
        );
        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err)
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">404 - Recipe Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">← Back to search</Link>
        </div>
      </main>
    );
  }

  if (loading || !data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">Loading recipe details...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-500">{data.title}</h1>

        <p className="text-sm text-gray-500 mb-4 text-gray-500">
          {data.readyInMinutes} min &nbsp;|&nbsp; {data.servings} servings
        </p>

        <div
          className="prose max-w-none mb-6 text-gray-500"
          dangerouslySetInnerHTML={{ __html: data.summary }}
        />

        <h2 className="text-xl font-semibold mb-2 text-gray-500">Ingredients:</h2>
        <ul className="list-disc pl-6 text-gray-500">
          {data.extendedIngredients.map((item, index) => (
            <li key={index}>{item.original}</li>
          ))}
        </ul>

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
