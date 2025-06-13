'use client';

import { useRouter } from 'next/navigation';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          onClick={() => router.push(`/recipes/${recipe.id}`)}
        >
          <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-semibold text-gray-500">{recipe.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
