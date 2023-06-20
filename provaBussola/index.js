
const express = require('express');
const fetch = require('node-fetch').default;
const path = require('path');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use('/', routes);

const getPokemonData = async (pokemonName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

app.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name;

  const pokemonData = await getPokemonData(pokemonName);

  if (pokemonData) {
    const abilities = pokemonData.abilities.map((ability) => ability.ability.name);
    const forms = pokemonData.forms.map((form) => form.name);
    const moves = pokemonData.moves.map((move) => move.move.name);
    const species = pokemonData.species.name;
    const stats = pokemonData.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));
    const types = pokemonData.types.map((type) => type.type.name);
    const imageUrl = data.sprites.other['official-artwork'].front_default;

    const pokemon = {
      name: pokemonData.name,
      abilities,
      forms,
      moves,
      species,
      stats,
      types,
      image: imageUrl,
    };

    res.json(pokemon);
  } else {
    res.status(404).json({ error: 'Pokemon not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});