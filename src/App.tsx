import React from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import Store from './context/context';

function App() {
  const [counter, setCounter] = React.useState(0);
  const { pokemons } = React.useContext(Store);

  React.useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <div className="App">
      {pokemons.map((pokemon) => (
        <Pokemon
          key={pokemon.name}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
}

export default App;
