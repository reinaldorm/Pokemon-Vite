import React from 'react';
import { Pokemon } from '../types';

interface StoreValueProps {
  pokemons?: Pokemon[];
  getPokemonsByQuantity?: (quantity?: number) => void;
  getPokemonsByType?: (type: string) => void;
  getPokemonByNameOrId?: (query: string) => void;
}

const StoreInitialValue: StoreValueProps = {};

const Store = React.createContext(StoreInitialValue);

export default Store;
