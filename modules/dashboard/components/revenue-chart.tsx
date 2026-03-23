import { RevenuePoint } from "@/lib/mock-data";

type RevenueChartProps = {
  data: RevenuePoint[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Faturamento da semana</h3>
        <p className="text-xs text-muted-foreground">Ultimos 7 dias</p>
      </div>
      <div className="grid h-52 grid-cols-7 items-end gap-2">
        {data.map((item) => {
          const heightPercent = Math.max((item.value / maxValue) * 100, 6);

          return (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="h-44 w-full rounded-md bg-muted/70 p-1">
                <div
                  className="w-full rounded bg-primary/80 transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}
