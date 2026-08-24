import { Cog, Droplets, Gauge, Waves, Wrench } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const icones = {
  "bombas-submersas": Waves,
  "bombas-centrifugas": Droplets,
  "motores-eletricos": Cog,
  pressurizadores: Gauge,
  "pecas-reposicao": Wrench,
} as const;

export function ProductThumb({
  produto,
  className,
  iconClassName,
}: {
  produto: Product;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = icones[produto.categoria as keyof typeof icones] ?? Cog;
  return (
    <div
      className={cn(
        "grid aspect-[4/3] w-full place-items-center bg-gradient-to-br from-secondary to-muted",
        className,
      )}
    >
      <Icon className={cn("h-16 w-16 text-primary/40", iconClassName)} strokeWidth={1.25} />
    </div>
  );
}
