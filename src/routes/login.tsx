import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useShop } from "@/store/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar na minha conta | AB Moto Bombas" },
      { name: "description", content: "Acesse sua conta AB Moto Bombas para acompanhar pedidos e favoritos." },
      { property: "og:title", content: "Entrar na minha conta | AB Moto Bombas" },
      { property: "og:description", content: "Área do cliente AB Moto Bombas." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, user, logout } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-14">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <LogIn className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-black text-foreground">
          {user ? "Você já está conectado" : "Entrar na sua conta"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {user ? user.email : "Acompanhe pedidos, favoritos e orçamentos técnicos."}
        </p>

        {user ? (
          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="cta"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
            >
              Sair da conta
            </Button>
            <Button asChild variant="steel">
              <Link to="/">Continuar comprando</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com.br"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" variant="cta" className="w-full">
              Entrar
            </Button>
            <button
              type="button"
              className="w-full text-center text-sm text-muted-foreground hover:text-cta"
            >
              Esqueci minha senha
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
