import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, RotateCcw, ShoppingCart, Trash2 } from "lucide-react";
import { formatBRL, getProduto } from "@/data/products";
import { useShop, WHATSAPP_NUMERO } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { ProductThumb } from "@/components/ProductThumb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Meu Carrinho | AB Moto Bombas" },
      { name: "description", content: "Revise os itens do seu carrinho e finalize o pedido pelo WhatsApp." },
      { property: "og:title", content: "Meu Carrinho | AB Moto Bombas" },
      { property: "og:description", content: "Finalize seu pedido de bombas e motores." },
    ],
  }),
  component: CarrinhoPage,
});

function CarrinhoPage() {
  const { cart, total, setQuantidade, softRemove, undoRemove } = useShop();
  const ativos = cart.filter((i) => !i.removido);

  const finalizar = () => {
    const linhas = ativos.map((i) => {
      const p = getProduto(i.productId);
      return `• ${i.quantidade}x ${p?.nome} (${i.voltagem} / ${i.potencia}) — ${formatBRL(
        (p?.preco ?? 0) * i.quantidade,
      )}`;
    });
    const msg = [
      "Olá! Gostaria de finalizar o pedido abaixo na AB Moto Bombas:",
      "",
      ...linhas,
      "",
      `Total: ${formatBRL(total)}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-foreground">Meu carrinho</h1>

      {cart.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<ShoppingCart className="h-9 w-9" />}
            titulo="Seu carrinho está vazio"
            descricao="Adicione bombas, motores ou peças e finalize seu pedido direto com nosso time de vendas."
          >
            <Button asChild variant="cta">
              <Link to="/">Voltar às compras</Link>
            </Button>
            <Button asChild variant="steel">
              <Link to="/categoria/$slug" params={{ slug: "bombas-submersas" }}>
                Ver categorias
              </Link>
            </Button>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-4">
            {cart.map((item) => {
              const p = getProduto(item.productId);
              if (!p) return null;
              return (
                <article
                  key={item.key}
                  className={cn(
                    "grid grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-xl border border-border bg-card p-4 transition-all sm:grid-cols-[6rem_minmax(0,1fr)_auto]",
                    item.removido && "opacity-50 grayscale",
                  )}
                >
                  <ProductThumb produto={p} className="aspect-square rounded-lg" iconClassName="h-8 w-8" />

                  <div className="min-w-0">
                    <Link
                      to="/produto/$id"
                      params={{ id: p.id }}
                      className="line-clamp-2 font-semibold text-foreground hover:text-cta"
                    >
                      {p.nome}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.voltagem} • {item.potencia}
                    </p>
                    <p className="mt-2 font-bold text-primary">
                      {formatBRL(p.preco * item.quantidade)}
                    </p>

                    {!item.removido ? (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            aria-label="Diminuir quantidade"
                            className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQuantidade(item.key, item.quantidade - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantidade}
                          </span>
                          <button
                            aria-label="Aumentar quantidade"
                            className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setQuantidade(item.key, item.quantidade + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => softRemove(item.key)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="steel"
                        size="sm"
                        className="mt-3"
                        onClick={() => undoRemove(item.key)}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Adicionar Novamente
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold text-foreground">Resumo do pedido</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Itens ativos</span>
                <span>{ativos.reduce((a, i) => a + i.quantidade, 0)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete</span>
                <span>a combinar</span>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-2xl font-black text-primary">{formatBRL(total)}</span>
            </div>
            <Button
              variant="cta"
              size="lg"
              className="mt-5 w-full"
              disabled={ativos.length === 0}
              onClick={finalizar}
            >
              Finalizar Pedido no WhatsApp
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Você será direcionado ao nosso setor de vendas com o pedido pronto.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
