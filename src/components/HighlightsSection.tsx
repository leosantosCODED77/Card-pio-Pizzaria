import React, { useState } from 'react';
import { CATALOG_ITEMS, MenuItem, PizzaSizeOption, formatPriceBRL } from '../catalog';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink } from '../siteConfig';
import { Plus, MessageCircle, Flame, Sparkles } from 'lucide-react';

export const HighlightsSection: React.FC = () => {
  const { addItem } = useCart();
  const featuredPizzas = CATALOG_ITEMS.filter((item) => item.isPopular || item.isChefSpecial).slice(0, 4);

  // Keep state for selected size per card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSizeOption>>(() => {
    const initial: Record<string, PizzaSizeOption> = {};
    featuredPizzas.forEach((pizza) => {
      if (pizza.availableSizes && pizza.availableSizes.length > 0) {
        // default to grande (index 1 if exists)
        initial[pizza.id] = pizza.availableSizes[1] || pizza.availableSizes[0];
      }
    });
    return initial;
  });

  const handleSizeChange = (pizzaId: string, size: PizzaSizeOption) => {
    setSelectedSizes((prev) => ({ ...prev, [pizzaId]: size }));
  };

  const getPrice = (pizza: MenuItem) => {
    const size = selectedSizes[pizza.id];
    return pizza.basePrice + (size ? size.priceDelta : 0);
  };

  return (
    <section id="destaques" className="relative bg-neutral-900/60 py-20 border-y border-neutral-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Seleção do Chef</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              As Favoritas da Dennys pizzaria
            </h2>
            <p className="mt-2 text-base text-neutral-400 max-w-xl">
              As combinações mais pedidas e elogiadas pelos nossos clientes, preparadas na hora com ingredientes frescos.
            </p>
          </div>
          <a
            href="#cardapio"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
          >
            Ver todas as opções do cardápio &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPizzas.map((pizza) => {
            const currentSize = selectedSizes[pizza.id];
            const currentPrice = getPrice(pizza);

            return (
              <div
                key={pizza.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:border-neutral-700 hover:shadow-xl hover:shadow-orange-950/20"
              >
                <div>
                  {/* Image slot */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {pizza.isChefSpecial && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md bg-orange-600/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-md">
                        <Flame className="h-3 w-3 fill-white" />
                        <span>Especial</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {pizza.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {pizza.description}
                    </p>

                    {/* Size Selector */}
                    {pizza.availableSizes && pizza.availableSizes.length > 0 && (
                      <div className="mt-4">
                        <span className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-500 mb-1.5">
                          Tamanho:
                        </span>
                        <div className="grid grid-cols-3 gap-1 rounded-lg bg-neutral-900 p-1 border border-neutral-800">
                          {pizza.availableSizes.map((size) => (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => handleSizeChange(pizza.id, size)}
                              className={`rounded py-1 text-[11px] font-medium transition-colors ${
                                currentSize?.id === size.id
                                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {size.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price and size breakdown */}
                    <div className="mt-4 flex items-baseline justify-between border-t border-neutral-900 pt-3">
                      <div>
                        <span className="text-xs text-neutral-500">A partir de</span>
                        <div className="font-display text-xl font-bold text-amber-400 tabular-nums">
                          {formatPriceBRL(currentPrice)}
                        </div>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        {currentSize ? currentSize.name : 'Individual'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => addItem(pizza, currentSize)}
                    className="flex items-center justify-center gap-1 rounded-xl bg-neutral-800 py-2.5 px-2 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Adicionar</span>
                  </button>

                  <a
                    href={buildWhatsAppLink(
                      `Olá! Vim pelo site da Dennys pizzaria e gostaria de pedir a pizza *${pizza.name}* (${currentSize?.name || 'Padrão'}) no valor de ${formatPriceBRL(currentPrice)}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 px-2 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:brightness-110"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-neutral-950" />
                    <span>Pedir Já</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
