import React from 'react';

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

interface StoreValueProps {
  pokemons: Pokemon[];
}

const StoreInitialValue: StoreValueProps = {
  pokemons: [],
};

const Store = React.createContext(StoreInitialValue);

export default Store;
