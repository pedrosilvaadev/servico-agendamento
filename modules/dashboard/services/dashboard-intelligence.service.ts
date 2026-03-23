import { clientsMock, transactionsMock } from "@/lib/mock-data";

export type DashboardIntelligenceMetric = {
  id: string;
  title: string;
  value: string;
  trend: string;
};

export type DashboardIntelligenceData = {
  metrics: DashboardIntelligenceMetric[];
  insights: string[];
};

const INACTIVITY_THRESHOLD_DAYS = 30;

function toCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function toPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getDashboardIntelligenceData(): DashboardIntelligenceData {
  const revenue = transactionsMock
    .filter((transaction) => transaction.type === "INCOME")
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

  const expense = transactionsMock
    .filter((transaction) => transaction.type === "EXPENSE")
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

  const profit = revenue - expense;

  const incomeTransactions = transactionsMock.filter(
    (transaction) => transaction.type === "INCOME",
  );

  const averageTicket = incomeTransactions.length > 0 ? revenue / incomeTransactions.length : 0;

  const inactiveClients = clientsMock.filter(
    (client) => client.lastVisitDays > INACTIVITY_THRESHOLD_DAYS,
  ).length;

  const inactiveRatio = clientsMock.length > 0 ? (inactiveClients / clientsMock.length) * 100 : 0;

  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  const metrics: DashboardIntelligenceMetric[] = [
    {
      id: "total-revenue",
      title: "Faturamento total",
      value: toCurrency(revenue),
      trend: `${incomeTransactions.length} entradas no período`,
    },
    {
      id: "total-expense",
      title: "Despesas",
      value: toCurrency(expense),
      trend: `${transactionsMock.filter((transaction) => transaction.type === "EXPENSE").length} saídas no período`,
    },
    {
      id: "profit",
      title: "Lucro",
      value: toCurrency(profit),
      trend: `Margem ${toPercent(profitMargin)}`,
    },
    {
      id: "average-ticket",
      title: "Ticket médio",
      value: toCurrency(averageTicket),
      trend: "Receita média por atendimento",
    },
    {
      id: "inactive-clients",
      title: "Clientes inativos",
      value: `${inactiveClients}`,
      trend: `${toPercent(inactiveRatio)} da base com mais de ${INACTIVITY_THRESHOLD_DAYS} dias`,
    },
  ];

  const insights: string[] = [
    inactiveClients > 0
      ? `${inactiveClients} cliente(s) estão inativos há mais de ${INACTIVITY_THRESHOLD_DAYS} dias. Priorize campanhas de retorno.`
      : "Nenhum cliente inativo acima do limite definido.",
    profit > 0
      ? `Operação saudável: lucro positivo de ${toCurrency(profit)} no período atual.`
      : `Atenção: lucro negativo de ${toCurrency(profit)}. Revise custos e precificação.`,
    averageTicket < 200
      ? "Ticket médio abaixo de R$ 200. Combine serviços para aumentar valor por atendimento."
      : "Ticket médio em bom patamar. Foque em retenção para ampliar receita recorrente.",
  ];

  return {
    metrics,
    insights,
  };
}
