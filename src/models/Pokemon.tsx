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

export default class Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
  is_default: boolean;
  sprites: Sprites;
  variant: string;
  constructor(name: string, id: number, height: number, weight: number, types: Type[], stats: Stat[], is_default: boolean, sprites: Sprites) {
    this.name = name;
    this.id = id;
    this.height = height / 10;
    this.weight = weight / 10;
    this.types = types;
    this.stats = stats;
    this.is_default = is_default;
    this.sprites = sprites;
    this.variant = this.getVariant(this.is_default);
  }

  getVariant(check: boolean) {
    if (!check) {
      if (this.name.includes('gmax')) return 'gmax';
      else if (this.name.includes('mega')) return 'mega';
      else return '';
    } else {
      return '';
    }
  }
}
