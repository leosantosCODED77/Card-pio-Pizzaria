import React from 'react';
import { Flame, MessageCircle, Instagram, Clock, MapPin, Phone } from 'lucide-react';
import { siteConfig, buildWhatsAppLink, buildInstagramLinks } from '../siteConfig';

export const Footer: React.FC = () => {
  const { profileUrl } = buildInstagramLinks();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 pt-16 pb-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-900">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 text-neutral-950">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Pizzas artesanais com massa maturada por 48 horas, assadas no verdadeiro forno a
              lenha e preparadas com ingredientes nobres para o seu jantar.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da pizzaria"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da pizzaria"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-pink-500/50 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Business Hours & Region */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Atendimento & Entrega
            </h3>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteConfig.operatingHours}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteConfig.deliveryZone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>WhatsApp: {siteConfig.whatsappFormatted}</span>
              </li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#destaques" className="hover:text-amber-400 transition-colors">
                  Pizzas Mais Pedidas
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-amber-400 transition-colors">
                  Cardápio Completo
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-amber-400 transition-colors">
                  Diferenciais do Forno a Lenha
                </a>
              </li>
              <li>
                <a href="#como-pedir" className="hover:text-amber-400 transition-colors">
                  Como Fazer seu Pedido
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </div>
          <div>
            Imagens gastronômicas preparadas com IA de alta definição para a Dennys pizzaria.
          </div>
        </div>
      </div>
    </footer>
  );
};
