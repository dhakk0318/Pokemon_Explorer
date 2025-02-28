"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await res.json();
      const detailedPokemon = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
      setPokemonList(detailedPokemon);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, [limit]);

  const loadMore = () => setLimit((prevLimit) => prevLimit + 10);

  const filteredPokemon = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 bg-white px-6 py-3 rounded-lg shadow-md">
        Pokémon List
      </h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        className="border p-3 rounded-lg w-80 text-center shadow-md my-6 focus:ring-2 focus:ring-blue-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white p-6 rounded-xl shadow-lg border transition-transform hover:scale-105 cursor-pointer flex flex-col items-center hover:bg-blue-50"
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
          >
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              width={120}
              height={120}
              className="object-contain"
            />
            <h2 className="text-lg font-semibold capitalize mt-3">{pokemon.name}</h2>
          </div>
        ))}
      </div>

      {loading && <p className="mt-6 text-blue-500">Loading more Pokémon...</p>}

      <button
        onClick={loadMore}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Load More
      </button>
    </div>
  );
}
