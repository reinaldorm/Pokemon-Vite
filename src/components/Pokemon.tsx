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

const Counter = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
      <h2>{pokemon.id}</h2>
      <h5 style={{ textTransform: 'capitalize' }}>{pokemon.types[0].type.name}</h5>
      <img
        style={{ maxWidth: '10rem' }}
        src={pokemon.sprites.other['official-artwork'].front_default}
      />
    </div>
  );
};

export default Counter;
