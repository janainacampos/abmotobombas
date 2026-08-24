import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { formatBRL, nomeCategoria, type Product } from "@/data/products";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductThumb } from "@/components/ProductThumb";

export function ProductCard({ produto }: { produto: Product }) {
  const { addToCart, toggleFavorito, isFavorito } = useShop();
  const fav = isFavorito(produto.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative">
        <Link to="/produto/$id" params={{ id: produto.id }} className="block">
          <ProductThumb produto={produto} />
        </Link>
        <button
          type="button"
          aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          onClick={() => toggleFavorito(produto)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-muted-foreground shadow transition-colors hover:text-destructive"
        >
          <Heart className={cn("h-5 w-5", fav && "fill-destructive text-destructive")} />
        </button>
        {produto.precoAntigo && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            OFERTA
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {nomeCategoria(produto.categoria)}
        </span>
        <Link
          to="/produto/$id"
          params={{ id: produto.id }}
          className="line-clamp-2 font-semibold text-foreground hover:text-primary"
        >
          {produto.nome}
        </Link>
        <div className="mt-auto pt-2">
          {produto.precoAntigo && (
            <p className="text-sm text-muted-foreground line-through">
              {formatBRL(produto.precoAntigo)}
            </p>
          )}
          <p className="text-xl font-bold text-primary">{formatBRL(produto.preco)}</p>
          <p className="text-xs text-muted-foreground">em até 10x sem juros</p>
        </div>
        <Button variant="cta" className="mt-3 w-full" onClick={() => addToCart(produto)}>
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </article>
  );
}
