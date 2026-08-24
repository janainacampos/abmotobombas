import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { getProduto, type Product } from "@/data/products";
import { useShop } from "@/store/shop";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus Favoritos | AB Moto Bombas" },
      { name: "description", content: "Sua lista de bombas, motores e peças favoritas na AB Moto Bombas." },
      { property: "og:title", content: "Meus Favoritos | AB Moto Bombas" },
      { property: "og:description", content: "Produtos que você salvou para comprar depois." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { favoritos } = useShop();
  const lista = favoritos
    .map((id) => getProduto(id))
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-foreground">Meus Favoritos</h1>
      <p className="mt-1 text-sm text-muted-foreground">{lista.length} item(ns) salvos</p>

      {lista.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<Heart className="h-9 w-9" />}
            titulo="Você ainda não tem favoritos"
            descricao="Toque no coração dos produtos para salvá-los aqui e comparar com calma depois."
          >
            <Button asChild variant="cta">
              <Link to="/">Voltar às compras</Link>
            </Button>
            <Button asChild variant="steel">
              <Link to="/categoria/$slug" params={{ slug: "motores-eletricos" }}>
                Ver categorias
              </Link>
            </Button>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
