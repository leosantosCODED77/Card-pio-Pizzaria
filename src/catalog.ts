export interface PizzaSizeOption {
  id: 'media' | 'grande' | 'gigante';
  name: string; // e.g. "Média (6 fatias)"
  slices: number;
  priceDelta: number; // additional or base multiplier
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'especiais' | 'tradicionais' | 'doces' | 'bebidas';
  description: string;
  ingredients: string[];
  basePrice: number; // Grande/Standard price in BRL
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  availableSizes?: PizzaSizeOption[];
}

export const PIZZA_SIZES: PizzaSizeOption[] = [
  { id: 'media', name: 'Média (6 fatias)', slices: 6, priceDelta: -10 },
  { id: 'grande', name: 'Grande (8 fatias)', slices: 8, priceDelta: 0 },
  { id: 'gigante', name: 'Gigante (12 fatias)', slices: 12, priceDelta: 16 },
];

export const CATEGORIES = [
  { id: 'todas', label: 'Todas as Opções' },
  { id: 'especiais', label: 'Especiais da Casa' },
  { id: 'tradicionais', label: 'Pizzas Salgadas' },
  { id: 'doces', label: 'Pizzas Doces' },
  { id: 'bebidas', label: 'Bebidas Geladas' },
] as const;

export const CATALOG_ITEMS: MenuItem[] = [
  {
    id: 'pizza-calabresa-especial',
    name: 'Calabresa Artesanal Especial',
    category: 'especiais',
    description:
      'Fatias finas de calabresa defumada artesanal, cebola roxa caramelizada na lenha, muçarela derretida, azeitonas pretas chilenas e toque de orégano fresco.',
    ingredients: ['Calabresa defumada', 'Cebola roxa caramelizada', 'Muçarela', 'Molho artesanal', 'Orégano'],
    basePrice: 58.0,
    image: '/src/assets/images/pizza_calabresa_especial_1793233763527.jpg',
    isPopular: true,
    isChefSpecial: true,
    availableSizes: PIZZA_SIZES,
  },
  {
    id: 'pizza-quatro-queijos',
    name: 'Quatro Queijos Nobres',
    category: 'especiais',
    description:
      'Harmonia perfeita de muçarela especial, queijo gorgonzola cremoso, provolone defumado e parmesão ralado na hora sobre molho de tomate San Marzano.',
    ingredients: ['Muçarela premium', 'Gorgonzola', 'Provolone defumado', 'Parmesão capa preta', 'Molho pelati'],
    basePrice: 66.0,
    image: '/src/assets/images/pizza_quatro_queijos_1793233764449.jpg',
    isPopular: true,
    availableSizes: PIZZA_SIZES,
  },
  {
    id: 'pizza-margherita-doc',
    name: 'Margherita Clássica Verace',
    category: 'tradicionais',
    description:
      'A autêntica receita napolitana: molho de tomate rústico, queijo muçarela de búfala derretida, folhas frescas de manjericão e fio de azeite extravirgem.',
    ingredients: ['Molho San Marzano', 'Muçarela de búfala', 'Manjericão fresco', 'Azeite extravirgem'],
    basePrice: 54.0,
    image: '/src/assets/images/hero_artisan_pizza_1793233763555.jpg',
    isPopular: true,
    availableSizes: PIZZA_SIZES,
  },
  {
    id: 'pizza-doce-chocolate-morango',
    name: 'Chocolate Trufado com Morango',
    category: 'doces',
    description:
      'Massa fina assada, ganache de chocolate meio amargo nobre, fatias generosas de morangos frescos e raspas delicadas de chocolate branco.',
    ingredients: ['Ganache de chocolate', 'Morangos frescos', 'Raspas de chocolate branco'],
    basePrice: 48.0,
    image: '/src/assets/images/pizza_doce_chocolate_1793233764922.jpg',
    isChefSpecial: true,
    availableSizes: [
      { id: 'media', name: 'Média (6 fatias)', slices: 6, priceDelta: -8 },
      { id: 'grande', name: 'Grande (8 fatias)', slices: 8, priceDelta: 0 },
    ],
  },
  {
    id: 'pizza-frango-catupiry',
    name: 'Frango Desfiado com Catupiry',
    category: 'tradicionais',
    description:
      'Peito de frango cozido e desfiado fininho, temperado com ervas aromáticas, coberto com autêntico requeijão Catupiry cremoso e milho verde.',
    ingredients: ['Frango temperado', 'Requeijão Catupiry original', 'Muçarela', 'Milho verde doce', 'Orégano'],
    basePrice: 56.0,
    image: '/src/assets/images/pizza_calabresa_especial_1793233763527.jpg',
    availableSizes: PIZZA_SIZES,
  },
  {
    id: 'pizza-portuguesa-nobre',
    name: 'Portuguesa Tradicional Nobre',
    category: 'tradicionais',
    description:
      'Presunto cozido fatiado, ovos caipiras, cebola em rodelas finas, ervilhas frescas, muçarela e azeitonas pretas em cama de molho caseiro.',
    ingredients: ['Presunto especial', 'Ovos', 'Cebola', 'Ervilhas', 'Muçarela', 'Azeitonas pretas'],
    basePrice: 59.0,
    image: '/src/assets/images/pizza_quatro_queijos_1793233764449.jpg',
    availableSizes: PIZZA_SIZES,
  },
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola Original 2 Litros',
    category: 'bebidas',
    description: 'Refrigerante Coca-Cola 2L, entregue estalando de gelada.',
    ingredients: ['Garrafa 2 Litros'],
    basePrice: 14.0,
    image: '/src/assets/images/hero_artisan_pizza_1793233763555.jpg',
  },
  {
    id: 'guarana-antarctica-2l',
    name: 'Guaraná Antarctica 2 Litros',
    category: 'bebidas',
    description: 'Refrigerante Guaraná Antarctica 2L bem gelado para acompanhar.',
    ingredients: ['Garrafa 2 Litros'],
    basePrice: 12.0,
    image: '/src/assets/images/hero_artisan_pizza_1793233763555.jpg',
  },
  {
    id: 'cerveja-heineken-longneck',
    name: 'Heineken Long Neck 330ml',
    category: 'bebidas',
    description: 'Cerveja Puro Malte premium Heineken 330ml, hiper gelada.',
    ingredients: ['Garrafa 330ml'],
    basePrice: 11.0,
    image: '/src/assets/images/pizza_calabresa_especial_1793233763527.jpg',
  },
];

export function formatPriceBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
}
