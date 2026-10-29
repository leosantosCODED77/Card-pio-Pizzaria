import React, { useState, useMemo } from 'react';
import { CATALOG_ITEMS, CATEGORIES, MenuItem, PizzaSizeOption, formatPriceBRL } from '../catalog';
import { useCart } from '../context/CartContext';
import { buildWhatsAppLink } from '../siteConfig';
import { Search, Plus, MessageCircle, Flame } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected size per item ID
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSizeOption>>(() => {
    const initial: Record<string, PizzaSizeOption> = {};
    CATALOG_ITEMS.forEach((item) => {
      if (item.availableSizes && item.availableSizes.length > 0) {
        initial[item.id] = item.availableSizes[1] || item.availableSizes[0];
      }
    });
    return initial;
  });

  // Optional custom notes per item (e.g. "Sem cebola")
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todas' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSizeChange = (itemId: string, size: PizzaSizeOption) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const getItemPrice = (item: MenuItem) => {
    const size = selectedSizes[item.id];
    return item.basePrice + (size ? size.priceDelta : 0);
  };

  return (
    <section id="cardapio" className="py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
            <Flame className="h-4 w-4" />
            <span>Cardápio Artesanal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Escolha sua Fornada Perfeita
          </h2>
          <p className="mt-2 text-base text-neutral-400">
            Pizzas montadas artesanalmente com ingredientes de primeira qualidade e assadas no ponto certo.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs (Functional segmented controls) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-900 rounded-xl border border-neutral-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sabor ou ingrediente..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2.5 pl-10 pr-4 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-12 text-center">
            <p className="text-neutral-400 text-sm">
              Nenhuma pizza encontrada com o termo "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todas');
              }}
              className="mt-3 text-xs font-semibold text-amber-400 hover:underline"
            >
              Limpar busca e ver cardápio completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const currentSize = selectedSizes[item.id];
              const price = getItemPrice(item);
              const note = customNotes[item.id] || '';

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800/90 bg-neutral-900/70 p-5 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                >
                  <div>
                    {/* Visual & tags */}
                    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-950">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {item.isPopular && (
                        <span className="absolute top-2.5 right-2.5 rounded bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow">
                          Mais Pedido
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-white">
                        {item.name}
                      </h3>
                      <span className="font-display text-base font-bold text-amber-400 whitespace-nowrap tabular-nums">
                        {formatPriceBRL(price)}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredients unboxed text */}
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400">
                        <span className="text-neutral-500 font-medium">Ingredientes:</span>
                        {item.ingredients.map((ing, idx) => (
                          <span key={idx}>
                            {ing}
                            {idx < item.ingredients.length - 1 ? ' · ' : ''}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Size selector if available */}
                    {item.availableSizes && item.availableSizes.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-neutral-800">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                          <span className="font-medium text-neutral-300">Selecione o tamanho:</span>
                          <span>{currentSize?.name}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 rounded-lg bg-neutral-950 p-1 border border-neutral-800">
                          {item.availableSizes.map((size) => (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => handleSizeChange(item.id, size)}
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

                    {/* Optional Note input */}
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Ex: sem cebola, bem assada... (opcional)"
                        value={note}
                        onChange={(e) =>
                          setCustomNotes((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-[11px] text-neutral-300 placeholder-neutral-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-neutral-800 pt-4">
                    <button
                      type="button"
                      onClick={() => addItem(item, currentSize, note)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-neutral-800 py-2.5 px-3 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </button>

                    <a
                      href={buildWhatsAppLink(
                        `Olá! Vim pelo site da Dennys pizzaria e gostaria de pedir *${item.name}*${
                          currentSize ? ` (${currentSize.name})` : ''
                        }${note ? ` [Obs: ${note}]` : ''} - Valor: ${formatPriceBRL(price)}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 px-3 text-xs font-semibold text-neutral-950 shadow-sm transition-all hover:brightness-110 active:scale-95"
                    >
                      <MessageCircle className="h-4 w-4 fill-neutral-950" />
                      <span>Pedir Agora</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
