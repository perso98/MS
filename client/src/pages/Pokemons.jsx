import React from "react";
import PokemonCard from "../components/PokemonCard";

function Pokemons() {
  const poks = [1, 2, 3, 4];
  return (
    <>
      <div className="pokemons-number">
        <h2>{poks.length}/10</h2>
      </div>
      {poks.map((pokemon) => {
        return <PokemonCard />;
      })}
    </>
  );
}

export default Pokemons;
