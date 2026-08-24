import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { buscar } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/busca")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Busca de produtos | AB Moto Bombas" },
      { name: "description", content: "Encontre bombas, motores e peças no catálogo AB Moto Bombas." },
      { property: "og:title", content: "Busca de produtos | AB Moto Bombas" },
      { property: "og:description", content: "Resultados de busca no catálogo AB Moto Bombas." },
    ],
  }),
  component: BuscaPage,
});

function BuscaPage() {
  const { q } = Route.useSearch();
  const resultados = buscar(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-black text-foreground">
        Resultados para “{q}”
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {resultados.length} produto(s) encontrado(s)
      </p>

      {resultados.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<SearchX className="h-9 w-9" />}
            titulo="Nenhum produto encontrado"
            descricao="Não localizamos itens com esse termo. Tente palavras como “bomba”, “motor” ou “capacitor”."
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
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resultados.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
