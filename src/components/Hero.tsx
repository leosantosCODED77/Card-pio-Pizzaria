import React from 'react';
import { MessageCircle, ArrowRight, Clock, Flame, ShieldCheck } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:py-24">
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-10 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7">
            {/* Unboxed editorial trust kicker */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-400">
              <span>Massa de Fermentação Lenta 48h</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Forno a Lenha 450°C</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Delivery em toda a região</span>
            </div>

            <h1
              style={{ textWrap: 'balance' }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              A verdadeira pizza artesanal, assada no forno a lenha e entregue{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                crocante e quentinha
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed">
              Massa leve que não pesa no estômago, molho de tomate San Marzano artesanal e
              queijos nobres derretidos no ponto exato. Faça seu pedido em segundos direto no
              nosso WhatsApp oficial.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={buildWhatsAppLink(
                  'Olá! Gostaria de pedir uma pizza artesanal da Dennys pizzaria. Pode me enviar o cardápio e o tempo de entrega de hoje?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-base font-semibold text-neutral-950 shadow-lg shadow-orange-500/20 transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <MessageCircle className="h-5 w-5 fill-neutral-950" />
                <span>Pedir Agora no WhatsApp</span>
              </a>

              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-6 py-3.5 text-base font-medium text-neutral-200 transition-colors hover:border-amber-500/50 hover:bg-neutral-800 hover:text-white"
              >
                <span>Ver Cardápio Completo</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </a>
            </div>

            {/* Quick Metrics Bar (Human editorial indicators) */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-800/80 pt-6">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  48h
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Fermentação lenta</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
                  450°C
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Forno a lenha</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  35-50m
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Tempo médio entrega</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-orange-500/30 to-amber-500/20 blur-xl opacity-75" />

              <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
                <img
                  src="/src/assets/images/hero_artisan_pizza_1793233763555.jpg"
                  alt="Pizza artesanal da Dennys pizzaria saindo do forno a lenha com queijo derretido e manjericão fresco"
                  referrerPolicy="no-referrer"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Bottom floating card overlay */}
                <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/10 bg-neutral-950/85 p-3.5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Forno a Lenha Ativo</div>
                        <div className="text-[11px] text-neutral-400">
                          {siteConfig.operatingHours}
                        </div>
                      </div>
                    </div>
                    <a
                      href={buildWhatsAppLink('Olá! Gostaria de fazer um pedido.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
                    >
                      Pedir
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
