import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HighlightsSection } from './components/HighlightsSection';
import { MenuSection } from './components/MenuSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InstagramCommunitySection } from './components/InstagramCommunitySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <HighlightsSection />
          <MenuSection />
          <DifferentialsSection />
          <HowItWorksSection />
          <InstagramCommunitySection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
