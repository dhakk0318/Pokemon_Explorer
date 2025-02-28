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
          <h1 className="text-3xl md:text-4xl font-bold capitalize text-gray-800 mb-4">
            {pokemon.name}
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex justify-center md:w-1/2">
              <Image
                src={
                  pokemon.sprites?.other["official-artwork"]?.front_default ||
                  "/placeholder.png"
                }
                alt={pokemon.name}
                width={250}
                height={250}
                className="bg-white p-6 rounded-xl shadow-lg border transition-transform hover:scale-105 cursor-pointer"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md text-gray-700">
              <p className="text-lg mb-4">
                <strong>Height:</strong> {pokemon.height / 10}m
              </p>
              <p className="text-lg mb-4">
                <strong>Weight:</strong> {pokemon.weight / 10}kg
              </p>
              <p className="text-lg mb-4">
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
