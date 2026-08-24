import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import {
  formatBRL,
  getProduto,
  nomeCategoria,
  porCategoria,
  produtos,
  type Product,
} from "@/data/products";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const produto = getProduto(params.id);
    if (!produto) throw notFound();
    return { produto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produto não encontrado | AB Moto Bombas" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.produto;
    return {
      meta: [
        { title: `${p.nome} | AB Moto Bombas` },
        { name: "description", content: p.descricao.slice(0, 155) },
        { property: "og:title", content: `${p.nome} | AB Moto Bombas` },
        { property: "og:description", content: p.descricao.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-black text-foreground">Produto não encontrado</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link to="/">Voltar às compras</Link>
      </Button>
    </div>
  ),
  component: ProdutoPage,
});

function ProdutoPage() {
  const { produto } = Route.useLoaderData();
  const { addToCart, toggleFavorito, isFavorito, registrarVisto, vistos } = useShop();
  const [voltagem, setVoltagem] = useState(produto.voltagens[0] ?? "Padrão");
  const [potencia, setPotencia] = useState(produto.potencias[0] ?? "Padrão");

  useEffect(() => {
    setVoltagem(produto.voltagens[0] ?? "Padrão");
    setPotencia(produto.potencias[0] ?? "Padrão");
  }, [produto]);

  useEffect(() => {
    registrarVisto(produto.id);
  }, [produto.id, registrarVisto]);

  const relacionados = porCategoria(produto.categoria)
    .filter((p) => p.id !== produto.id)
    .slice(0, 4);
  const vistosProdutos = vistos
    .filter((id) => id !== produto.id)
    .map((id) => getProduto(id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);
  const fav = isFavorito(produto.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-cta">
          Início
        </Link>{" "}
        /{" "}
        <Link to="/categoria/$slug" params={{ slug: produto.categoria }} className="hover:text-cta">
          {nomeCategoria(produto.categoria)}
        </Link>{" "}
        / <span className="text-foreground">{produto.nome}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <ProductThumb produto={produto} className="aspect-square" iconClassName="h-40 w-40" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {produto.marca}
          </span>
          <h1 className="mt-1 text-3xl font-black text-foreground">{produto.nome}</h1>

          <div className="mt-4">
            {produto.precoAntigo && (
              <p className="text-sm text-muted-foreground line-through">
                {formatBRL(produto.precoAntigo)}
              </p>
            )}
            <p className="text-4xl font-black text-primary">{formatBRL(produto.preco)}</p>
            <p className="text-sm text-muted-foreground">
              ou 10x de {formatBRL(produto.preco / 10)} sem juros
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <Variacoes
              titulo="Voltagem"
              opcoes={produto.voltagens}
              valor={voltagem}
              onChange={setVoltagem}
            />
            <Variacoes
              titulo="Potência"
              opcoes={produto.potencias}
              valor={potencia}
              onChange={setPotencia}
            />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              variant="cta"
              size="lg"
              className="flex-1"
              onClick={() => addToCart(produto, { voltagem, potencia })}
            >
              <ShoppingCart className="h-5 w-5" />
              Comprar agora
            </Button>
            <Button
              variant="steel"
              size="lg"
              onClick={() => toggleFavorito(produto)}
              aria-label="Favoritar produto"
            >
              <Heart className={cn("h-5 w-5", fav && "fill-destructive text-destructive")} />
              Favoritar
            </Button>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 text-sm sm:grid-cols-2">
            <p className="flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4 text-cta" /> Envio para todo o Brasil
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-cta" /> Garantia de 12 meses
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Descrição técnica</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{produto.descricao}</p>
            <dl className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {produto.especificacoes.map((e) => (
                <div key={e.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{e.label}</dt>
                  <dd className="font-semibold text-foreground">{e.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-black text-foreground">Produtos relacionados</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}

      {vistosProdutos.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-black text-foreground">Vistos por último</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vistosProdutos.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}

      {relacionados.length === 0 && vistosProdutos.length === 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-black text-foreground">Você também pode gostar</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.slice(0, 4).map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Variacoes({
  titulo,
  opcoes,
  valor,
  onChange,
}: {
  titulo: string;
  opcoes: string[];
  valor: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">
        {titulo}: <span className="font-normal text-muted-foreground">{valor}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={cn(
              "min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors",
              valor === o
                ? "border-cta bg-cta text-cta-foreground"
                : "border-border bg-card text-foreground hover:border-cta",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
