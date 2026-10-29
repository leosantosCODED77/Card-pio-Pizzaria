import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, siteConfig } from '../siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Atendimento rápido via WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 group"
    >
      {/* Tooltip on desktop hover */}
      <div className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-900 border border-neutral-700 text-neutral-100 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
        <span>Peça pelo WhatsApp</span>
      </div>

      <a
        href={buildWhatsAppLink(
          `Olá ${siteConfig.name}! Gostaria de fazer um pedido de pizza pelo delivery.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp oficial da Dennys pizzaria"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-950/40 transition-transform duration-200 hover:scale-110 hover:bg-emerald-400 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
      >
        <MessageCircle className="h-7 w-7 fill-white stroke-none" />

        {/* Quiet badge */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-neutral-950">
          1
        </span>
      </a>
    </aside>
  );
};
