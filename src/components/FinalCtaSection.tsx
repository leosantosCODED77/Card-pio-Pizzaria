import React from 'react';
import { MessageCircle, ArrowRight, Flame } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../siteConfig';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-20 border-t border-neutral-800">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-orange-600/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-neutral-950 shadow-lg shadow-orange-500/20 mb-6">
          <Flame className="h-7 w-7 fill-current" />
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Pronto para saborear a melhor pizza da noite?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300">
          O forno a lenha já está aquecido a mais de 450°C. Escolha seus sabores favoritos e
          peça agora mesmo pelo nosso WhatsApp com entrega rápida e segura.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={buildWhatsAppLink(
              `Olá! Gostaria de fazer um pedido na ${siteConfig.name} para entrega agora à noite.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-neutral-950 shadow-xl shadow-orange-500/20 transition-all hover:brightness-110 active:scale-95"
          >
            <MessageCircle className="h-5 w-5 fill-neutral-950" />
            <span>Fazer Pedido no WhatsApp</span>
          </a>

          <a
            href="#cardapio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-4 text-base font-semibold text-neutral-200 hover:border-neutral-700 hover:text-white transition-colors"
          >
            <span>Ver Cardápio Novamente</span>
            <ArrowRight className="h-4 w-4 text-amber-400" />
          </a>
        </div>

        <div className="mt-8 text-xs text-neutral-500">
          Horário de atendimento hoje: <span className="text-neutral-400">{siteConfig.operatingHours}</span>
        </div>
      </div>
    </section>
  );
};
