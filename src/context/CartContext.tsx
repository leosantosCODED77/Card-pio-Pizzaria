import React, { createContext, useContext, useEffect, useState } from 'react';
import { MenuItem, PizzaSizeOption, formatPriceBRL } from '../catalog';
import { siteConfig, buildWhatsAppLink, buildInstagramLinks } from '../siteConfig';

export interface CartItem {
  cartItemId: string; // generated unique id
  item: MenuItem;
  selectedSize?: PizzaSizeOption;
  quantity: number;
  notes?: string;
  unitPrice: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  deliveryType: 'entrega' | 'retirada';
  address: string;
  paymentMethod: 'pix' | 'cartao_entrega' | 'dinheiro';
  changeFor?: string;
  notes?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: MenuItem, size?: PizzaSizeOption, notes?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  generateOrderSummaryText: () => string;
  checkoutWhatsApp: () => void;
  getInstagramCheckoutData: () => { summary: string; profileUrl: string; directUrl: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'dennys_pizzaria_cart_v1';
const CUSTOMER_STORAGE_KEY = 'dennys_pizzaria_customer_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            deliveryType: 'entrega',
            address: '',
            paymentMethod: 'pix',
            changeFor: '',
            notes: '',
          };
    } catch {
      return {
        name: '',
        phone: '',
        deliveryType: 'entrega',
        address: '',
        paymentMethod: 'pix',
        changeFor: '',
        notes: '',
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch {
      // ignore
    }
  }, [customerDetails]);

  const addItem = (item: MenuItem, size?: PizzaSizeOption, notes?: string) => {
    const sizeToUse = size || (item.availableSizes ? item.availableSizes[1] || item.availableSizes[0] : undefined);
    const unitPrice = item.basePrice + (sizeToUse ? sizeToUse.priceDelta : 0);
    const cartItemId = `${item.id}_${sizeToUse?.id || 'standard'}_${notes || 'default'}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          selectedSize: sizeToUse,
          quantity: 1,
          notes,
          unitPrice,
        },
      ];
    });

    setIsOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);

  const generateOrderSummaryText = () => {
    const lines: string[] = [
      `🍕 *NOVO PEDIDO - ${siteConfig.name.toUpperCase()}*`,
      `Olá! Vim pelo site e gostaria de confirmar o seguinte pedido:`,
      '',
      '*ITENS:*',
    ];

    if (items.length === 0) {
      lines.push('Nenhum item selecionado ainda.');
    } else {
      items.forEach((ci) => {
        const sizeLabel = ci.selectedSize ? ` (${ci.selectedSize.name})` : '';
        const itemTotal = formatPriceBRL(ci.unitPrice * ci.quantity);
        lines.push(`• ${ci.quantity}x ${ci.item.name}${sizeLabel} — ${itemTotal}`);
        if (ci.notes) {
          lines.push(`   _Obs: ${ci.notes}_`);
        }
      });
    }

    lines.push('');
    lines.push(`*SUBTOTAL:* ${formatPriceBRL(subtotal)}`);
    lines.push('');
    lines.push('*DADOS PARA ENTREGA:*');
    lines.push(`• Nome: ${customerDetails.name.trim() || '[A informar no WhatsApp]'}`);
    if (customerDetails.phone.trim()) {
      lines.push(`• Telefone: ${customerDetails.phone.trim()}`);
    }
    lines.push(
      `• Tipo: ${customerDetails.deliveryType === 'entrega' ? '🛵 Entrega em domicílio' : '🏬 Retirada no balcão'}`
    );
    if (customerDetails.deliveryType === 'entrega') {
      lines.push(`• Endereço: ${customerDetails.address.trim() || '[A informar no WhatsApp]'}`);
    }

    const paymentLabel =
      customerDetails.paymentMethod === 'pix'
        ? 'Pix (Chave informada no WhatsApp)'
        : customerDetails.paymentMethod === 'cartao_entrega'
        ? 'Cartão na máquina do entregador'
        : `Dinheiro ${customerDetails.changeFor ? `(Troco para ${customerDetails.changeFor})` : '(Sem troco)'}`;

    lines.push(`• Pagamento: ${paymentLabel}`);

    if (customerDetails.notes?.trim()) {
      lines.push(`• Observações gerais: ${customerDetails.notes.trim()}`);
    }

    lines.push('');
    lines.push('Por favor, confirme a disponibilidade e o tempo de entrega!');
    return lines.join('\n');
  };

  const checkoutWhatsApp = () => {
    const text = generateOrderSummaryText();
    const link = buildWhatsAppLink(text);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const getInstagramCheckoutData = () => {
    const summary = generateOrderSummaryText();
    const { profileUrl, directUrl } = buildInstagramLinks();
    return { summary, profileUrl, directUrl };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        customerDetails,
        setCustomerDetails,
        generateOrderSummaryText,
        checkoutWhatsApp,
        getInstagramCheckoutData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
