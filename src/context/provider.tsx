import React from 'react';
import Store from './context';
import PokemonModel from '../models/Pokemon';
import { Pokemon } from '../types';

type StoreProps = {
  children: React.ReactNode;
};

interface TypeEndpoint {
  pokemon: Array<{ pokemon: Pokemon }>;
}

const apiURL = 'https://pokeapi.co/api/v2';

const StoreProvider = ({ children }: StoreProps) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

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
      const query = id || i.toString();

      const pokemon = await mountPokemonByApiData(query, endpoint);

      setPokemons((pokemons) => [...pokemons, pokemon]);
    }
  }

  async function getPokemonByNameOrId(query: string) {
    setPokemons([]);

    const pokemon = await mountPokemonByApiData(query, 'pokemon');

    setPokemons([pokemon]);
  }

  async function getPokemonsByType(type: string) {
    setPokemons([]);

    const APIresponse = await fetch(apiURL + '/type/' + type);
    const { pokemon: APIpokemon }: TypeEndpoint = await APIresponse.json();

    APIpokemon.forEach(({ pokemon }) => getPokemonsByQuantity(1, 'pokemon', pokemon.name));
  }

  React.useEffect(() => {
    getPokemonsByQuantity();
  }, []);

  return (
    <Store.Provider value={{ pokemons, getPokemonsByQuantity, getPokemonByNameOrId, getPokemonsByType }}>
      {children}
    </Store.Provider>
  );
};

export default StoreProvider;
