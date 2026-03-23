import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type TransactionItemProps = {
  description: string;
  amountLabel: string;
  type: "INCOME" | "EXPENSE";
  occurredAtLabel: string;
};

export function TransactionItem({
  description,
  amountLabel,
  type,
  occurredAtLabel,
}: TransactionItemProps) {
  const isIncome = type === "INCOME";

  return (
    <article className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted">
          {isIncome ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
        </span>
        <div>
          <p className="text-sm font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">{occurredAtLabel}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{amountLabel}</p>
        <Badge variant={isIncome ? "secondary" : "outline"}>{isIncome ? "Receita" : "Despesa"}</Badge>
      </div>
    </article>
  );
}
