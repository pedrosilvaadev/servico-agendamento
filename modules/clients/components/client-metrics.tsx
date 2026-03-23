type ClientMetricsProps = {
  activeClients: number;
  newThisMonth: number;
};

export function ClientMetrics({ activeClients, newThisMonth }: ClientMetricsProps) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <p className="text-xs text-muted-foreground">Clientes ativos</p>
        <p className="mt-2 text-2xl font-semibold">{activeClients}</p>
      </article>
      <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <p className="text-xs text-muted-foreground">Novos no mes</p>
        <p className="mt-2 text-2xl font-semibold">{newThisMonth}</p>
      </article>
    </section>
  );
}
