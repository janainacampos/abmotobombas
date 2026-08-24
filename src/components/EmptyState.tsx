import type { ReactNode } from "react";

export function EmptyState({
  icon,
  titulo,
  descricao,
  children,
}: {
  icon: ReactNode;
  titulo: string;
  descricao: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-secondary text-primary">
        {icon}
      </div>
      <h2 className="mt-6 text-xl font-bold text-foreground">{titulo}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{descricao}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
