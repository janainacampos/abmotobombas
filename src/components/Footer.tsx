import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { categorias } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-black uppercase">
            AB <span className="text-cta">Moto Bombas</span>
          </h3>
          <p className="mt-3 text-sm text-primary-foreground/75">
            Especialistas em bombas, motores e pressurização. Atendimento técnico com quem entende
            de pressão e vazão.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cta">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              (13) 99111-6587
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              contato@abmotobombas.com.br
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              R. Maués, 173 - Vila Tupi, Praia Grande - SP, 11703-090
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cta">Links úteis</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cta" /> Garantia de 12 meses
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-cta" /> Assistência Técnica
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-cta" /> Prazos de Entrega
            </li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {categorias.slice(0, 3).map((c) => (
              <li key={c.slug}>
                <Link to="/categoria/$slug" params={{ slug: c.slug }} className="hover:text-cta">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cta">
            Formas de pagamento
          </h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Pix", "Boleto", "Visa", "Master", "Elo", "Amex", "10x sem juros"].map((m) => (
              <span
                key={m}
                className="rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1.5 text-xs font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        Copyright © All rights reserved. |{" "}
        <a
          href="https://miauagenciadigital.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cta hover:underline"
        >
          AB Moto Bombas by MIAU
        </a>
        .
      </div>
    </footer>
  );
}
