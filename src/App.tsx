import React from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import Store from './context/context';

function App() {
  const { pokemons, getPokemonsByQuantity } = React.useContext(Store);

  React.useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  function handleGetPokemon() {
    if (getPokemonsByQuantity) getPokemonsByQuantity(18);
  }

  return (
    <div className='App'>
      {pokemons &&
        pokemons.map((pokemon) => (
          <Pokemon
            key={pokemon.name}
            pokemon={pokemon}
          />
        ))}
      <button onClick={handleGetPokemon}>Show More</button>
    </div>
  );
}

export default App;
