import React from 'react';

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
    dream_world: {
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

interface StoreValueProps {
  pokemons?: Pokemon[];
  getPokemonsByQuantity?: (quantity?: number) => void;
  getPokemonsByType?: (type: string) => void;
  getPokemonByNameOrId?: (query: string) => void;
}

const StoreInitialValue: StoreValueProps = {};

const Store = React.createContext(StoreInitialValue);

export default Store;
