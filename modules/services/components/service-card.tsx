import { Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type ServiceCardProps = {
  name: string;
  durationMinute: number;
  priceLabel: string;
  isActive: boolean;
};

export function ServiceCard({ name, durationMinute, priceLabel, isActive }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{name}</h3>
        <Badge variant={isActive ? "secondary" : "outline"}>{isActive ? "Ativo" : "Inativo"}</Badge>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <p className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" />
          {durationMinute} min
        </p>
        <p className="font-medium text-foreground">{priceLabel}</p>
      </div>
    </article>
  );
}
