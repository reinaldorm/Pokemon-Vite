import React from 'react';
import Store from './context';
import PokemonModel from '../models/Pokemon';

interface StoreProps {
  children: React.ReactNode;
}

type Stat = {
  base_state: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Sprites = {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
};

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

interface TypeEndpoint {
  pokemon: Array<{ pokemon: Pokemon }>;
}

const apiURL = 'https://pokeapi.co/api/v2';

const StoreProvider = ({ children }: StoreProps) => {
  const [pokemons, setPokemons]: [Pokemon[], React.Dispatch<React.SetStateAction<Pokemon[]>>] = React.useState(() => {
    const pokemons: Pokemon[] = [];

    return pokemons;
  });

  async function getApiData(query: string, endpoint: 'pokemon' | 'type'): Promise<Pokemon> {
    const APIresponse = await fetch(apiURL + '/' + endpoint + '/' + query);
    const APIData = await APIresponse.json();

    return APIData;
  }

  async function mountPokemonByApiData(query: string, endpoint: 'pokemon' | 'type') {
    const APIdata: Pokemon = await getApiData(query, endpoint);

    const { name, id, height, weight, types, stats, is_default, sprites } = APIdata;
    const pokemon: Pokemon = new PokemonModel(name, id, height, weight, types, stats, is_default, sprites);

    return pokemon;
  }

  async function getPokemonsByQuantity(quantity: number = 18, endpoint: 'pokemon' | 'type' = 'pokemon', id?: string) {
    for (let i = pokemons.length + 1; i <= pokemons.length + quantity; i += 1) {
      const pokemon = await mountPokemonByApiData(id || i.toString(), endpoint);

      setPokemons((pokemons) => [...pokemons, pokemon]);
    }
  }

  async function getPokemonByNameOrId(query: string) {
    setPokemons([]);

    const pokemon = await mountPokemonByApiData(query, 'pokemon');

    setPokemons((pokemons) => [...pokemons, pokemon]);
  }

  async function getPokemonsByType(type: string) {
    setPokemons([]);

    const APIresponse = await fetch(apiURL + '/type/' + type);
    const { pokemon: APIpokemon }: TypeEndpoint = await APIresponse.json();

    console.log(APIpokemon.length);

    APIpokemon.forEach(({ pokemon }) => getPokemonsByQuantity(1, 'pokemon', pokemon.name));
  }

  React.useEffect(() => {
    getPokemonsByType('fire');
  }, []);

  return <Store.Provider value={{ pokemons, getPokemonsByQuantity, getPokemonByNameOrId, getPokemonsByType }}>{children}</Store.Provider>;
};

export default StoreProvider;
