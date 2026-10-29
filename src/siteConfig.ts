export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  segment: string;
  whatsappNumber: string; // international digits only, e.g. "5591999999999"
  whatsappFormatted: string; // e.g. "(91) 99999-9999"
  instagramUsername: string; // e.g. "dennysPizzas"
  operatingHours: string;
  deliveryEstimate: string;
  addressInfo: string;
  deliveryZone: string;
  defaultWelcomeMessage: string;
}

export const siteConfig: SiteConfig = {
  name: 'Dennys pizzaria',
  tagline: 'Massa artesanal de fermentação lenta & Forno a lenha',
  description:
    'A verdadeira experiência da pizza artesanal entregue na sua porta. Ingredientes nobres selecionados, fermentação lenta de 48 horas e assadas em alta temperatura.',
  segment: 'Delivery de Pizzas Artesanais',
  whatsappNumber: '5591999999999',
  whatsappFormatted: '(91) 99999-9999',
  instagramUsername: 'dennysPizzas',
  operatingHours: 'Terça a Domingo das 18h00 às 23h30',
  deliveryEstimate: '35 a 50 minutos',
  addressInfo: 'Atendimento e Delivery regional',
  deliveryZone: 'Entregamos em toda a região metropolitana',
  defaultWelcomeMessage:
    'Olá! Conheci a Dennys pizzaria pelo site e gostaria de mais informações.',
};

/**
 * Builds a direct wa.me link with encoded text message.
 */
export function buildWhatsAppLink(message?: string): string {
  const text = message || siteConfig.defaultWelcomeMessage;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds an Instagram link (web and direct message fallback).
 */
export function buildInstagramLinks(): { profileUrl: string; directUrl: string } {
  const user = siteConfig.instagramUsername;
  return {
    profileUrl: `https://www.instagram.com/${user}/`,
    directUrl: `https://ig.me/m/${user}`,
  };
}
