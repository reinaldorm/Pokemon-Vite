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

const Pokemon = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
      <h2>{pokemon.id}</h2>
      <h5 style={{ textTransform: 'capitalize' }}>{pokemon.types[0].type.name}</h5>
      <img
        style={{ maxWidth: '10rem' }}
        src={pokemon.sprites.other.dream_world.front_default}
      />
    </div>
  );
};

export default Pokemon;
