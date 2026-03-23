type FinancialSummaryCardProps = {
  revenueLabel: string;
  expenseLabel: string;
  balanceLabel: string;
};

export function FinancialSummaryCard({
  revenueLabel,
  expenseLabel,
  balanceLabel,
}: FinancialSummaryCardProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold">Resumo financeiro</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Receitas</dt>
          <dd className="font-medium">{revenueLabel}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Despesas</dt>
          <dd className="font-medium">{expenseLabel}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-border/70 pt-2">
          <dt className="text-muted-foreground">Saldo</dt>
          <dd className="font-semibold">{balanceLabel}</dd>
        </div>
      </dl>
    </article>
  );
}
