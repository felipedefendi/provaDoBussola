const container = document.getElementById('pokemon-container');

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

const createPokemonCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
  
    const image = document.createElement('img');
    image.classList.add('pokemon-image');
    image.src = pokemon.image;
    image.alt = pokemon.name;
  
    const name = document.createElement('h2');
    name.classList.add('pokemon-name');
    name.textContent = pokemon.name;
  
    const abilities = document.createElement('p');
    abilities.classList.add('pokemon-attribute');
    abilities.textContent = `Abilities: ${pokemon.abilities.join(', ')}`;
  
    const forms = document.createElement('p');
    forms.classList.add('pokemon-attribute');
    forms.textContent = `Forms: ${pokemon.forms.join(', ')}`;
  
    const moves = document.createElement('p');
    moves.classList.add('pokemon-attribute');
    moves.textContent = `Moves: ${pokemon.moves.join(', ')}`;
  
    const species = document.createElement('p');
    species.classList.add('pokemon-attribute');
    species.textContent = `Species: ${pokemon.species}`;
  
    const stats = document.createElement('ul');
    stats.classList.add('pokemon-stats');
    pokemon.stats.forEach((stat) => {
      const statItem = document.createElement('li');
      statItem.textContent = `${stat.name}: ${stat.value}`;
      stats.appendChild(statItem);
    });
  
    const types = document.createElement('p');
    types.classList.add('pokemon-attribute');
    types.textContent = `Types: ${pokemon.types.join(', ')}`;
  
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(abilities);
    card.appendChild(forms);
    card.appendChild(moves);
    card.appendChild(species);
    card.appendChild(stats);
    card.appendChild(types);
  
    return card;
  };

const displayPokemon = async (pokemonName) => {
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

    const pokemon = {
      name: pokemonData.name,
      abilities,
      forms,
      moves,
      species,
      stats,
      types,
    };

    const pokemonCard = createPokemonCard(pokemon);
    container.appendChild(pokemonCard);
  } else {
    const errorText = document.createElement('p');
    errorText.textContent = 'Pokemon not found';
    container.appendChild(errorText);
  }
};

export const displayPokemonByName = async () => {
    
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    
    try {
      await getPokemonByName(pokemonName);
    } catch (error) {
      console.log(error);
      alert('Pokemon not found');
    }
  };

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
    container.innerHTML = '';
});

const getPokemonByName = async (name) => {
    displayPokemon(name);
};