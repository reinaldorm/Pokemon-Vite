import React from 'react';

import { Pokemon } from '../types';

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
