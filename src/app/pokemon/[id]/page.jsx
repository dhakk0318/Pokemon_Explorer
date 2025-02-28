"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-gray-200">
      {pokemon && (
        <>
          <h1 className="text-4xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
          <Image
            src={pokemon.sprites?.other["official-artwork"]?.front_default || "/placeholder.png"}
            alt={pokemon.name}
            width={200}
            height={200}
            className="bg-white p-6 rounded-xl shadow-lg border transition-transform hover:scale-105 cursor-pointer flex flex-col items-center hover:bg-blue-50"
          />
          <div className="mt-6 p-6 w-80 bg-white rounded-lg shadow-md text-gray-700">
            <p><strong>Height:</strong> {pokemon.height / 10}m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
            <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          </div>
        </>
      )}
    </div>
  );
}
