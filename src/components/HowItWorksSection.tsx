import React from 'react';
import { Smartphone, Flame, Bike, ArrowRight } from 'lucide-react';
import { buildWhatsAppLink } from '../siteConfig';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Smartphone,
      title: 'Monte seu pedido',
      description:
        'Escolha seus sabores favoritos, defina o tamanho e adicione observações personalizadas com facilidade.',
    },
    {
      step: '02',
      icon: Smartphone,
      title: 'Confirme no WhatsApp',
      description:
        'O resumo completo vai pré-preenchido para o nosso WhatsApp oficial. Você só precisa clicar em enviar.',
    },
    {
      step: '03',
      icon: Bike,
      title: 'Receba quentinha',
      description:
        'Sua pizza vai direto para o forno a lenha e sai voando com nosso motoboy em embalagem térmica protetora.',
    },
  ];

  return (
    <section id="como-pedir" className="py-20 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 block">
            Simples, Rápido e Seguro
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Como funciona o pedido no Delivery?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Sem cadastros demorados ou aplicativos pesados. Seu pedido é atendido diretamente por pessoas reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-center transition-all hover:border-neutral-700 hover:bg-neutral-900/80"
              >
                <div className="absolute top-4 right-6 font-display text-4xl font-extrabold text-neutral-800/80">
                  {item.step}
                </div>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 mb-5">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={buildWhatsAppLink('Olá! Gostaria de fazer meu pedido de pizza.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors shadow-md shadow-orange-500/10"
          >
            <span>Iniciar Pedido Agora</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
