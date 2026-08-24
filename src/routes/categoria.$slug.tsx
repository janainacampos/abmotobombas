import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { categorias, porCategoria } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/categoria/$slug")({
  head: ({ params }) => {
    const cat = categorias.find((c) => c.slug === params.slug);
    const titulo = `${cat?.nome ?? "Categoria"} | AB Moto Bombas`;
    const desc = cat?.descricao ?? "Produtos da AB Moto Bombas.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { slug } = Route.useParams();
  const cat = categorias.find((c) => c.slug === slug);
  const lista = porCategoria(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-cta">
          Início
        </Link>{" "}
        / <span className="text-foreground">{cat?.nome ?? slug}</span>
      </nav>
      <h1 className="mt-3 text-3xl font-black text-foreground">{cat?.nome ?? "Categoria"}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{cat?.descricao}</p>

      {lista.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={<PackageSearch className="h-9 w-9" />}
            titulo="Nenhum produto nesta categoria"
            descricao="Estamos repondo o estoque. Confira outras categorias enquanto isso."
          >
            <Button asChild variant="cta">
              <Link to="/">Voltar às compras</Link>
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
