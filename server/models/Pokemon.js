import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
});

export default mongoose.model("Pokemon", PokemonSchema);
