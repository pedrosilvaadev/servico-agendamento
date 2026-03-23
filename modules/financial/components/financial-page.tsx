import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { transactionsMock } from "@/lib/mock-data";
import { FinancialSummaryCard } from "@/modules/financial/components/financial-summary-card";
import { TransactionItem } from "@/modules/financial/components/transaction-item";

function toCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function FinancialPage() {
  const revenue = transactionsMock
    .filter((item) => item.type === "INCOME")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const expense = transactionsMock
    .filter((item) => item.type === "EXPENSE")
    .reduce((accumulator, item) => accumulator + item.amount, 0);

  const balance = revenue - expense;

  return (
    <section className="space-y-5">
      <PageHeader
        title="Financeiro"
        description="Entradas, saídas e resumo consolidado para decisão diária."
        badgeText="Fluxo de caixa"
        actions={<Button>Nova transação</Button>}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">Entradas e saídas</h3>
          <div className="space-y-2">
            {transactionsMock.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                description={transaction.description}
                amountLabel={toCurrency(transaction.amount)}
                type={transaction.type}
                occurredAtLabel={transaction.occurredAtLabel}
              />
            ))}
          </div>
        </article>

        <FinancialSummaryCard
          revenueLabel={toCurrency(revenue)}
          expenseLabel={toCurrency(expense)}
          balanceLabel={toCurrency(balance)}
        />
      </div>
    </section>
  );
}
