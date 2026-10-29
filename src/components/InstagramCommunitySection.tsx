import React, { useState } from 'react';
import { Instagram, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { siteConfig, buildInstagramLinks } from '../siteConfig';

export const InstagramCommunitySection: React.FC = () => {
  const { profileUrl, directUrl } = buildInstagramLinks();
  const [copied, setCopied] = useState(false);

  const sampleGreeting = `Olá @${siteConfig.instagramUsername}! Conheci a pizzaria pelo site e gostaria de saber as promoções de hoje!`;

  const handleCopyGreeting = async () => {
    try {
      await navigator.clipboard.writeText(sampleGreeting);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section className="py-16 bg-neutral-900/60 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3">
                <Instagram className="h-4 w-4" />
                <span>Nosso Perfil Oficial</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Siga a @{siteConfig.instagramUsername} no Instagram
              </h2>

              <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-xl">
                Acompanhe os bastidores da nossa cozinha, fornadas quentinhas do dia,
                novos sabores sazonais e promoções exclusivas anunciadas nos stories!
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 px-5 py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Acessar @{siteConfig.instagramUsername}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-3 text-xs font-semibold text-neutral-200 transition-colors hover:border-pink-500/50 hover:bg-neutral-800 hover:text-white"
                >
                  <Send className="h-3.5 w-3.5 text-pink-400" />
                  <span>Chamar no Direct</span>
                </a>
              </div>
            </div>

            {/* Right: Instagram Direct helper box */}
            <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
              <div className="text-xs font-semibold text-neutral-300 mb-2">
                Quer pedir ou tirar dúvidas pelo Direct?
              </div>
              <p className="text-[11px] text-neutral-400 mb-3">
                Copie a mensagem abaixo com 1 clique e envie diretamente no chat do Instagram:
              </p>

              <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 text-xs text-neutral-300 font-mono italic mb-3">
                "{sampleGreeting}"
              </div>

              <button
                type="button"
                onClick={handleCopyGreeting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-neutral-800 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Mensagem Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-neutral-400" />
                    <span>Copiar Mensagem para Direct</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
