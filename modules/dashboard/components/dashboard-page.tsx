import { BadgeDollarSign, CalendarDays, PiggyBank, TrendingUp, UserX } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { appointmentsMock, revenueSeries } from "@/lib/mock-data";
import { AppointmentList } from "@/modules/appointments/components/appointment-list";
import { InsightsPanel } from "@/modules/dashboard/components/insights-panel";
import { KpiCard } from "@/modules/dashboard/components/kpi-card";
import { QuickActions } from "@/modules/dashboard/components/quick-actions";
import { RevenueChart } from "@/modules/dashboard/components/revenue-chart";
import { getDashboardIntelligenceData } from "@/modules/dashboard/services/dashboard-intelligence.service";

const metricIcons = [
  <BadgeDollarSign key="m1" className="size-4 text-muted-foreground" />,
  <PiggyBank key="m2" className="size-4 text-muted-foreground" />,
  <TrendingUp key="m3" className="size-4 text-muted-foreground" />,
  <CalendarDays key="m4" className="size-4 text-muted-foreground" />,
  <UserX key="m5" className="size-4 text-muted-foreground" />,
];

export function DashboardPage() {
  const intelligenceData = getDashboardIntelligenceData();

  return (
    <section className="space-y-5">
      <PageHeader
        title="Dashboard"
        description="Inteligência de negócio com foco em faturamento, lucro e retenção de clientes."
        badgeText="Tempo real"
        actions={<Button variant="outline">Atualizar</Button>}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {intelligenceData.metrics.map((metric, index) => (
          <KpiCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            icon={metricIcons[index]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <RevenueChart data={revenueSeries} />

        <InsightsPanel insights={intelligenceData.insights} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Próximos agendamentos</h2>
            <Button variant="outline" size="sm">
              Ver agenda completa
            </Button>
          </div>
          <Separator className="my-4" />
          <AppointmentList
            items={appointmentsMock.slice(0, 3).map((item) => ({
              id: item.id,
              time: item.time,
              clientName: item.clientName,
              serviceName: item.serviceName,
              status: item.status,
            }))}
          />
        </article>

        <QuickActions
          actions={[
            { id: "qa-1", label: "Novo atendimento", variant: "default" },
            { id: "qa-2", label: "Registrar despesa" },
            { id: "qa-3", label: "Cadastrar serviço" },
          ]}
        />
      </div>
    </section>
  );
}
