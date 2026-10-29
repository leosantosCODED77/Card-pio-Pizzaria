import React, { useState } from 'react';
import { Flame, ShoppingBag, MessageCircle, Menu as MenuIcon, X } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../siteConfig';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-neutral-100 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 text-neutral-950 shadow-lg shadow-orange-500/20">
            <Flame className="h-6 w-6 fill-current stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-white">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-500 font-semibold">
              Forno a Lenha & Delivery
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#destaques" className="transition-colors hover:text-amber-400">
            Destaques
          </a>
          <a href="#cardapio" className="transition-colors hover:text-amber-400">
            Cardápio
          </a>
          <a href="#diferenciais" className="transition-colors hover:text-amber-400">
            Nossa Massa
          </a>
          <a href="#como-pedir" className="transition-colors hover:text-amber-400">
            Como Pedir
          </a>
          <a href="#faq" className="transition-colors hover:text-amber-400">
            Dúvidas
          </a>
        </nav>

        {/* Zone 3: Actions (Cart & WhatsApp) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir sacola de pedidos"
            className="relative flex h-10 items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-amber-500/40 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <ShoppingBag className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Pedido</span>
            {totalCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-1.5 text-xs font-bold text-neutral-950">
                {totalCount}
              </span>
            )}
          </button>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-md shadow-orange-500/15 transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <MessageCircle className="h-4 w-4 fill-neutral-950" />
            <span>Pedir no WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 md:hidden hover:text-white"
            aria-label="Menu de navegação"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950 px-4 py-5 md:hidden space-y-3">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-200">
            <a
              href="#destaques"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Destaques
            </a>
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Cardápio Completo
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Nossa Massa & Forno
            </a>
            <a
              href="#como-pedir"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Como Pedir
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Perguntas Frequentes
            </a>
          </nav>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-semibold text-neutral-950"
            >
              <MessageCircle className="h-4 w-4 fill-neutral-950" />
              <span>Pedir pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
