import { Mail, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type ClientCardProps = {
  name: string;
  email?: string | null;
  phone?: string | null;
  lastVisitLabel?: string;
};

export function ClientCard({ name, email, phone, lastVisitLabel }: ClientCardProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{name}</h3>
        {lastVisitLabel ? <Badge variant="secondary">{lastVisitLabel}</Badge> : null}
      </div>
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
        {email ? (
          <p className="inline-flex items-center gap-2">
            <Mail className="size-3.5" />
            {email}
          </p>
        ) : null}
        {phone ? (
          <p className="inline-flex items-center gap-2">
            <Phone className="size-3.5" />
            {phone}
          </p>
        ) : null}
      </div>
    </article>
  );
}
