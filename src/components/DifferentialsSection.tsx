import React from 'react';
import { Flame, Clock, HeartHandshake, PackageCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../siteConfig';

export const DifferentialsSection: React.FC = () => {
  const differentials = [
    {
      icon: Clock,
      title: 'Massa com 48h de Fermentação',
      description:
        'Nossa receita descansa por 48 horas em maturação a frio. O resultado é uma pizza leve, aromática, com bordas alvéoladas e que não pesa na digestão.',
    },
    {
      icon: Flame,
      title: 'Forno a Lenha em Alta Temperatura',
      description:
        'Assamos em temperatura superior a 450°C. O choque térmico sela os sabores instantaneamente, mantendo a crosta crocante e o queijo perfeitamente derretido.',
    },
    {
      icon: HeartHandshake,
      title: 'Ingredientes Nobres Selecionados',
      description:
        'Molho artesanal de tomates selecionados, queijos nobres de laticínios confiáveis e embutidos artesanais defumados de verdade.',
    },
    {
      icon: PackageCheck,
      title: 'Embalagem Térmica Anti-Umidade',
      description:
        'Caixas especiais com saídas estratégicas de vapor para garantir que a sua pizza chegue tão crocante na sua mesa quanto na hora que saiu do forno.',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-neutral-900/40 border-t border-neutral-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Quality */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 block">
              Tradição e Cuidado Artesanal
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Por que a pizza da {siteConfig.name} é tão diferente?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Não fazemos pizza no piloto automático. Cada disco de massa é aberto à mão,
              respeitando o tempo natural dos ingredientes e a magia secular do forno a lenha.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">
                  Zero conservantes químicos ou aceleradores de fermentação
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">
                  Azeite extravirgem e ervas frescas adicionados na finalização
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">
                  Entregadores dedicados para garantir agilidade na rota
                </span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={buildWhatsAppLink('Olá! Gostaria de experimentar as pizzas da Dennys pizzaria.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition-all hover:brightness-110"
              >
                <span>Experimente Hoje Mesmo</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Grid Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentials.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-950"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
