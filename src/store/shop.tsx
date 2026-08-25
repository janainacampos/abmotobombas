import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduto, type Product } from "@/data/products";

export type CartItem = {
  key: string;
  productId: string;
  quantidade: number;
  voltagem: string;
  potencia: string;
  removido: boolean;
};

type ShopState = {
  cart: CartItem[];
  favoritos: string[];
  vistos: string[];
  user: { email: string } | null;
  addToCart: (p: Product, opts?: { voltagem?: string; potencia?: string; qtd?: number }) => void;
  setQuantidade: (key: string, qtd: number) => void;
  softRemove: (key: string) => void;
  undoRemove: (key: string) => void;
  toggleFavorito: (p: Product) => void;
  isFavorito: (id: string) => boolean;
  registrarVisto: (id: string) => void;
  login: (email: string) => void;
  logout: () => void;
  total: number;
  totalItens: number;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [vistos, setVistos] = useState<string[]>([]);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const addToCart: ShopState["addToCart"] = useCallback((p, opts) => {
    const voltagem = opts?.voltagem ?? p.voltagens[0] ?? "Padrão";
    const potencia = opts?.potencia ?? p.potencias[0] ?? "Padrão";
    const qtd = opts?.qtd ?? 1;
    const key = `${p.id}|${voltagem}|${potencia}`;
    setCart((prev) => {
      const existente = prev.find((i) => i.key === key);
      if (existente) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantidade: i.quantidade + qtd, removido: false } : i,
        );
      }
      return [...prev, { key, productId: p.id, quantidade: qtd, voltagem, potencia, removido: false }];
    });
    toast.success("Adicionado ao carrinho", { description: p.nome });
  }, []);

  const setQuantidade = useCallback((key: string, qtd: number) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantidade: Math.max(1, qtd) } : i)),
    );
  }, []);

  const softRemove = useCallback((key: string) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, removido: true } : i)));
    toast("Item removido do total", { description: "Você pode adicionar novamente." });
  }, []);

  const undoRemove = useCallback((key: string) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, removido: false } : i)));
    toast.success("Item adicionado novamente");
  }, []);

  const toggleFavorito = useCallback((p: Product) => {
    setFavoritos((prev) => {
      if (prev.includes(p.id)) {
        toast("Removido dos favoritos", { description: p.nome });
        return prev.filter((id) => id !== p.id);
      }
      toast.success("Adicionado aos favoritos", { description: p.nome });
      return [...prev, p.id];
    });
  }, []);

  const isFavorito = useCallback((id: string) => favoritos.includes(id), [favoritos]);

  const registrarVisto = useCallback((id: string) => {
    setVistos((prev) => [id, ...prev.filter((v) => v !== id)].slice(0, 8));
  }, []);

  const login = useCallback((email: string) => {
    setUser({ email });
    toast.success("Login realizado", { description: email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast("Você saiu da sua conta");
  }, []);

  const total = useMemo(
    () =>
      cart
        .filter((i) => !i.removido)
        .reduce((acc, i) => acc + (getProduto(i.productId)?.preco ?? 0) * i.quantidade, 0),
    [cart],
  );

  const totalItens = useMemo(
    () => cart.filter((i) => !i.removido).reduce((acc, i) => acc + i.quantidade, 0),
    [cart],
  );

  const value: ShopState = {
    cart,
    favoritos,
    vistos,
    user,
    addToCart,
    setQuantidade,
    softRemove,
    undoRemove,
    toggleFavorito,
    isFavorito,
    registrarVisto,
    login,
    logout,
    total,
    totalItens,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return ctx;
}

export const WHATSAPP_NUMERO = "5513991116587";
