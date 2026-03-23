import { Badge } from "@/components/ui/badge";

type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
};

export function KpiCard({ title, value, trend, icon }: KpiCardProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <Badge variant="secondary" className="mt-3">
        {trend}
      </Badge>
    </article>
  );
}
