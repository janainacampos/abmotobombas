import { createFileRoute, Link } from "@tanstack/react-router";
import { Cog, Droplets, Gauge, ShieldCheck, Truck, Waves, Wrench } from "lucide-react";
import heroImg from "@/assets/hero-bombas.jpg";
import { categorias, produtos } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AB Moto Bombas | Bombas, Motores e Pressurizadores" },
      {
        name: "description",
        content:
          "Loja especializada em bombas submersas, centrífugas, motores elétricos, pressurizadores e peças de reposição com atendimento técnico.",
      },
      { property: "og:title", content: "AB Moto Bombas | Força e pressão para o seu projeto" },
      {
        property: "og:description",
        content: "Soluções completas em moto bombas, motores elétricos e equipamentos.",
      },
    ],
  }),
  component: Home,
});

const icones: Record<string, typeof Waves> = {
  "bombas-submersas": Waves,
  "bombas-centrifugas": Droplets,
  "motores-eletricos": Cog,
  pressurizadores: Gauge,
  "pecas-reposicao": Wrench,
};

function Home() {
  const maisVendidos = produtos.filter((p) => p.maisVendido);
  const ofertas = produtos.filter((p) => p.precoAntigo);

  return (
    <div>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImg}
          alt="Bombas d'água e motores elétricos industriais"
          width={1600}
          height={912}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:py-24 lg:py-28">
          <span className="w-fit rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-widest text-cta-foreground">
            Linha profissional 2026
          </span>
          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            A força que você precisa: Soluções completas em Moto Bombas e Equipamentos.
          </h1>
          <p className="max-w-2xl text-sm text-primary-foreground/80 sm:text-base">
            Bombas submersas, centrífugas, motores elétricos e pressurizadores com garantia de 12
            meses e suporte técnico especializado.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/categoria/$slug" params={{ slug: "bombas-submersas" }}>
                Ver Ofertas
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/categoria/$slug" params={{ slug: "motores-eletricos" }}>
                Motores Elétricos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3">
          {[
            { icon: Truck, t: "Entrega para todo o Brasil", d: "Frete calculado no pedido" },
            { icon: ShieldCheck, t: "Garantia de 12 meses", d: "Produtos certificados" },
            { icon: Wrench, t: "Assistência técnica", d: "Suporte de especialistas" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon className="h-8 w-8 shrink-0 text-cta" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{t}</p>
                <p className="truncate text-xs text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-black text-foreground">Navegue por categoria</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categorias.map((c) => {
            const Icon = icones[c.slug] ?? Cog;
            return (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-cta hover:shadow-lg"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-cta group-hover:text-cta-foreground">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-semibold text-foreground">{c.nome}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black text-foreground">Mais vendidos</h2>
          <Link to="/categoria/$slug" params={{ slug: "bombas-centrifugas" }} className="text-sm font-semibold text-cta hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {maisVendidos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-black text-foreground">Ofertas da semana</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ofertas.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
