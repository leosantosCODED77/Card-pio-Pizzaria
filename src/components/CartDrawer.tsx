import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPriceBRL } from '../catalog';
import { siteConfig } from '../siteConfig';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Instagram,
  ShoppingBag,
  Bike,
  Store,
  CreditCard,
  Banknote,
  QrCode,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    customerDetails,
    setCustomerDetails,
    checkoutWhatsApp,
    getInstagramCheckoutData,
  } = useCart();

  const [instagramModalOpen, setInstagramModalOpen] = useState(false);
  const [copiedInstagram, setCopiedInstagram] = useState(false);

  if (!isOpen) return null;

  const handleOpenInstagramCheckout = () => {
    setInstagramModalOpen(true);
  };

  const handleCopyInstagramSummary = async () => {
    const { summary } = getInstagramCheckoutData();
    try {
      await navigator.clipboard.writeText(summary);
      setCopiedInstagram(true);
      setTimeout(() => setCopiedInstagram(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-white">
                  Sua Sacola de Pizzas
                </h2>
                <p className="text-[11px] text-neutral-400">
                  {items.length === 0
                    ? 'Sacola vazia'
                    : `${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
              aria-label="Fechar sacola"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-neutral-600 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="font-display text-base font-semibold text-neutral-300">
                  Sua sacola está vazia
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
                  Selecione pizzas e bebidas no nosso cardápio para montar o seu pedido.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-5 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
                >
                  Explorar Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                    <span>Itens Selecionados</span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-neutral-500 hover:text-red-400 text-[11px] normal-case"
                    >
                      Limpar tudo
                    </button>
                  </div>

                  {items.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-bold text-white">
                            {cartItem.item.name}
                          </div>
                          {cartItem.selectedSize && (
                            <div className="text-[11px] text-amber-400 font-medium">
                              Tamanho: {cartItem.selectedSize.name}
                            </div>
                          )}
                          {cartItem.notes && (
                            <div className="text-[11px] text-neutral-400 italic">
                              Obs: {cartItem.notes}
                            </div>
                          )}
                        </div>

                        <div className="font-display text-sm font-bold text-white tabular-nums">
                          {formatPriceBRL(cartItem.unitPrice * cartItem.quantity)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-neutral-500 tabular-nums">
                          {formatPriceBRL(cartItem.unitPrice)} cada
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="w-5 text-center text-xs font-bold tabular-nums">
                            {cartItem.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeItem(cartItem.cartItemId)}
                            className="ml-1 p-1 text-neutral-500 hover:text-red-400"
                            aria-label="Remover item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Form */}
                <div className="space-y-4 border-t border-neutral-800 pt-5">
                  <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Dados do Pedido & Entrega
                  </div>

                  {/* Delivery or Pickup toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
                    <button
                      type="button"
                      onClick={() =>
                        setCustomerDetails((prev) => ({ ...prev, deliveryType: 'entrega' }))
                      }
                      className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                        customerDetails.deliveryType === 'entrega'
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Bike className="h-3.5 w-3.5" />
                      <span>Entrega</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCustomerDetails((prev) => ({ ...prev, deliveryType: 'retirada' }))
                      }
                      className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                        customerDetails.deliveryType === 'retirada'
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Store className="h-3.5 w-3.5" />
                      <span>Retirada</span>
                    </button>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                      Seu Nome:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Oliveira"
                      value={customerDetails.name}
                      onChange={(e) =>
                        setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                      WhatsApp para contato:
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: (91) 98888-7777"
                      value={customerDetails.phone}
                      onChange={(e) =>
                        setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Address if delivery */}
                  {customerDetails.deliveryType === 'entrega' && (
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        Endereço Completo (Rua, Nº, Bairro, Complemento):
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Av. Principal, 120, Apto 302, Bairro Centro"
                        value={customerDetails.address}
                        onChange={(e) =>
                          setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))
                        }
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 mb-1.5">
                      Forma de Pagamento pretendida:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setCustomerDetails((prev) => ({ ...prev, paymentMethod: 'pix' }))
                        }
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center text-[10px] font-medium transition-colors ${
                          customerDetails.paymentMethod === 'pix'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <QrCode className="h-4 w-4 mb-1 text-emerald-400" />
                        <span>Pix</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCustomerDetails((prev) => ({ ...prev, paymentMethod: 'cartao_entrega' }))
                        }
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center text-[10px] font-medium transition-colors ${
                          customerDetails.paymentMethod === 'cartao_entrega'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mb-1 text-cyan-400" />
                        <span>Cartão</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCustomerDetails((prev) => ({ ...prev, paymentMethod: 'dinheiro' }))
                        }
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center text-[10px] font-medium transition-colors ${
                          customerDetails.paymentMethod === 'dinheiro'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <Banknote className="h-4 w-4 mb-1 text-amber-400" />
                        <span>Dinheiro</span>
                      </button>
                    </div>

                    {customerDetails.paymentMethod === 'dinheiro' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Precisa de troco para quanto? (Ex: R$ 100)"
                          value={customerDetails.changeFor}
                          onChange={(e) =>
                            setCustomerDetails((prev) => ({ ...prev, changeFor: e.target.value }))
                          }
                          className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with Calculations and Checkout CTAs */}
          {items.length > 0 && (
            <div className="border-t border-neutral-800 bg-neutral-900/95 p-5 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-display font-bold text-white tabular-nums">
                    {formatPriceBRL(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Taxa de entrega:</span>
                  <span>Calculada no WhatsApp</span>
                </div>
              </div>

              {/* Primary: WhatsApp Checkout */}
              <button
                type="button"
                onClick={checkoutWhatsApp}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-orange-500/20 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5 fill-neutral-950" />
                <span>Confirmar Pedido via WhatsApp</span>
              </button>

              {/* Secondary: Instagram Direct alternative */}
              <button
                type="button"
                onClick={handleOpenInstagramCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 text-xs font-semibold text-neutral-300 hover:border-pink-500/40 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>Finalizar pelo Instagram</span>
              </button>

              <p className="text-center text-[10px] text-neutral-500 leading-tight">
                Seu pedido será aberto diretamente com a {siteConfig.name}. Você revisa e confirma o envio.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Instagram Checkout Modal */}
      {instagramModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            onClick={() => setInstagramModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-pink-500" />
                <h3 className="font-display text-base font-bold">
                  Finalizar Pedido pelo Instagram Direct
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInstagramModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 mb-4">
              Siga os 3 passos rápidos para enviar seu pedido via Direct para{' '}
              <span className="font-semibold text-pink-400">@{siteConfig.instagramUsername}</span>:
            </p>

            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 font-bold text-[10px] shrink-0">
                  1
                </span>
                <span>Copie o resumo formatado do seu pedido com o botão abaixo.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 font-bold text-[10px] shrink-0">
                  2
                </span>
                <span>Clique em "Abrir Direct do Instagram" para ir direto ao chat.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 font-bold text-[10px] shrink-0">
                  3
                </span>
                <span>Cole a mensagem copiada e envie! Nossa equipe confirmará o pedido.</span>
              </div>
            </div>

            {/* Order Preview */}
            <div className="max-h-44 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-3 font-mono text-[11px] text-neutral-300 whitespace-pre-wrap mb-4">
              {getInstagramCheckoutData().summary}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopyInstagramSummary}
                className="flex items-center justify-center gap-2 rounded-xl bg-neutral-800 py-3 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors"
              >
                {copiedInstagram ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Resumo Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-neutral-400" />
                    <span>1. Copiar Resumo</span>
                  </>
                )}
              </button>

              <a
                href={getInstagramCheckoutData().directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-xs font-semibold text-white shadow hover:brightness-110 transition-all"
              >
                <span>2. Abrir Direct</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
