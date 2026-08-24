import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Heart, LogOut, Menu, Search, ShoppingCart, User } from "lucide-react";
import { categorias } from "@/data/products";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { totalItens, favoritos, user, logout } = useShop();
  const navigate = useNavigate();
  const [termo, setTermo] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/busca", search: { q: termo } });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 lg:gap-6">
        <div className="flex min-w-0 items-center gap-2">
          <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menu"
                className="min-h-11 min-w-11 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Categorias</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {categorias.map((c) => (
                  <Link
                    key={c.slug}
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setMenuAberto(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    {c.nome}
                  </Link>
                ))}
                <Link
                  to="/favoritos"
                  onClick={() => setMenuAberto(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Meus Favoritos
                </Link>
                <Link
                  to="/carrinho"
                  onClick={() => setMenuAberto(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Carrinho
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-lg font-black uppercase tracking-tight sm:text-xl">
              AB <span className="text-cta">Moto Bombas</span>
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-widest text-primary-foreground/70 sm:block">
              Força e pressão para o seu projeto
            </span>
          </Link>
        </div>

        <form onSubmit={buscar} className="hidden md:block">
          <div className="relative">
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Busque por bombas, motores, peças..."
              aria-label="Buscar produtos"
              className="h-11 w-full rounded-full border border-transparent bg-background px-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cta"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded-full bg-cta text-cta-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-1">
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[10rem] truncate text-xs text-primary-foreground/80">
                {user.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-primary-foreground/10 sm:flex"
            >
              <User className="h-5 w-5" />
              Minha Conta
            </Link>
          )}

          <Link
            to="/login"
            aria-label="Minha conta"
            className="grid h-11 w-11 place-items-center rounded-md hover:bg-primary-foreground/10 sm:hidden"
          >
            <User className="h-5 w-5" />
          </Link>

          <Link
            to="/favoritos"
            aria-label="Meus favoritos"
            className="relative grid h-11 w-11 place-items-center rounded-md hover:bg-primary-foreground/10"
          >
            <Heart className="h-5 w-5" />
            {favoritos.length > 0 && (
              <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cta px-1 text-[11px] font-bold text-cta-foreground">
                {favoritos.length}
              </span>
            )}
          </Link>

          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="relative grid h-11 w-11 place-items-center rounded-md hover:bg-primary-foreground/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItens > 0 && (
              <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cta px-1 text-[11px] font-bold text-cta-foreground">
                {totalItens}
              </span>
            )}
          </Link>
        </div>
      </div>

      <form onSubmit={buscar} className="px-4 pb-3 md:hidden">
        <div className="relative">
          <input
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Busque por bombas, motores, peças..."
            aria-label="Buscar produtos"
            className="h-11 w-full rounded-full bg-background px-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cta"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-1 top-1 grid h-9 w-9 place-items-center rounded-full bg-cta text-cta-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      <nav className="hidden border-t border-primary-foreground/10 bg-primary/95 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <div className="group relative">
            <button className="flex items-center gap-1 px-4 py-3 text-sm font-semibold uppercase tracking-wide hover:text-cta">
              Todas as categorias
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-72 rounded-b-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {categorias.map((c) => (
                <Link
                  key={c.slug}
                  to="/categoria/$slug"
                  params={{ slug: c.slug }}
                  className="block rounded-lg px-3 py-2 text-sm text-card-foreground hover:bg-secondary"
                >
                  <span className="font-semibold">{c.nome}</span>
                  <span className="block text-xs text-muted-foreground">{c.descricao}</span>
                </Link>
              ))}
            </div>
          </div>
          {categorias.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="px-4 py-3 text-sm hover:text-cta"
              activeProps={{ className: "px-4 py-3 text-sm text-cta font-semibold" }}
            >
              {c.nome}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
