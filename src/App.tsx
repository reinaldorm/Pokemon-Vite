import React from 'react';
import Pokemon from './components/Pokemon';
import Store from './context/context';
import styles from './css/app.module.css';

function App() {
  const { pokemons, getPokemonsByQuantity } = React.useContext(Store);

  function handleGetPokemon() {
    if (getPokemonsByQuantity) getPokemonsByQuantity();
  }

  return (
    <div className={styles.appClass}>
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
