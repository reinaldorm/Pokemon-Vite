import React from 'react';
import Store from './context';
import PokemonModel from '../models/Pokemon';

interface StoreProps {
  children: React.ReactNode;
}

interface Stat {
  base_state: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
  is_default: boolean;
  sprites: Sprites;
}

const apiURL = 'https://pokeapi.co/api/v2';

const StoreProvider = ({ children }: StoreProps) => {
  const [pokemons, setPokemons]: [Pokemon[], React.Dispatch<React.SetStateAction<Pokemon[]>>] = React.useState(() => {
    const pokemons: Pokemon[] = [];
    return pokemons;
  });

  async function getApiDataByQuery(query: string, endpoint: 'pokemon' | 'type'): Promise<Pokemon> {
    const APIresponse = await fetch(apiURL + '/' + endpoint + '/' + query);
    const { name, id, height, weight, types, stats, is_default, sprites }: Pokemon = await APIresponse.json();
    const pokemon = new PokemonModel(name, id, height, weight, types, stats, is_default, sprites);

    return pokemon;
  }

  React.useEffect(() => {
    async function initState() {
      const pokemon = await getApiDataByQuery('1', 'pokemon');

      setPokemons([...pokemons, pokemon]);
    }

    initState();
  }, []);

  return <Store.Provider value={{ pokemons }}>{children}</Store.Provider>;
};

export default StoreProvider;
