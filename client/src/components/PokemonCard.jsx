import React from "react";
import "./pokemons.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
function PokemonCard() {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 1000)}`
      )
      .then((pok) => {
        setPokemon(pok.data);
      });
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "Legendary":
        return "orange";
      case "Rare":
        return "yellow";
      case "Common":
        return "lightblue";
      default:
        return "white";
    }
  };
  return (
    <div className="pokemon-card">
      {pokemon.species && pokemon.sprites ? (
        <div className="pokemon-card-info">
          <h3>{pokemon.species.name.toUpperCase()}</h3>
          <div className="pokemon-card-image-container ">
            <img src={pokemon.sprites.front_default} />
          </div>
          <div className="pokemon-card-stats">
            <span>Level: 10</span>
            <span>Attack: 20</span>
            <span>Defense: 30</span>
            <span>Hp: 45</span>
            <span>
              Type:{" "}
              <span style={{ color: getTypeColor("Legendary") }}>
                Legendary
              </span>
            </span>
          </div>
          <Button variant="contained" color="error">
            Fight
          </Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PokemonCard;
