import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteConfig } from '../siteConfig';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Qual o horário de funcionamento e dias de entrega?',
      answer: `Nosso delivery funciona de ${siteConfig.operatingHours}. Nos dias de pico (sextas e sábados), recomendamos antecipar seu pedido pelo WhatsApp para garantir fornadas rápidas.`,
    },
    {
      question: 'Quais formas de pagamento são aceitas no delivery?',
      answer:
        'Aceitamos Pix (chave enviada no WhatsApp com confirmação imediata), cartões de débito e crédito na maquininha sem fio levada pelo entregador, e dinheiro vivo (basta informar no resumo se precisará de troco).',
    },
    {
      question: 'É possível pedir pizza meio a meio?',
      answer:
        'Sim! Pelo WhatsApp você pode escolher dois sabores na mesma pizza grande ou gigante. O valor cobrado é proporcional aos sabores escolhidos.',
    },
    {
      question: 'Qual o tempo médio de entrega da pizza?',
      answer: `O tempo médio habitual varia entre ${siteConfig.deliveryEstimate}, dependendo da sua localização e do fluxo de pedidos. Ao enviar sua solicitação no WhatsApp, informamos a estimativa exata da sua fornada.`,
    },
    {
      question: 'Posso retirar o pedido no balcão?',
      answer:
        'Com certeza! Na sacola de pedidos, selecione a opção "Retirada no Balcão". Avisamos no WhatsApp assim que sua pizza estiver saindo dourada do forno.',
    },
    {
      question: 'A pizza chega quentinha e com massa crocante?',
      answer:
        'Sim! Utilizamos caixas térmicas com micro-respiros que retêm a temperatura do forno sem prender o vapor d’água, evitando que a crosta murche durante o transporte.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Tire suas Dúvidas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Tudo o que você precisa saber sobre nosso atendimento, entregas e preparo artesanal.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 transition-transform duration-200 shrink-0 ml-3 ${
                      isOpen ? 'rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
