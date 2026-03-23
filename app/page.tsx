import { CalendarDays, Scissors, Users, Wallet } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Loading } from "@/components/shared/loading";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppointmentList } from "@/modules/appointments/components/appointment-list";
import { ClientCard } from "@/modules/clients/components/client-card";
import { ClientMetrics } from "@/modules/clients/components/client-metrics";
import { KpiCard } from "@/modules/dashboard/components/kpi-card";
import { QuickActions } from "@/modules/dashboard/components/quick-actions";

export default function Home() {
  const appointments = [
    { id: "a-1", time: "09:00", clientName: "Marina Alves", serviceName: "Coloracao", status: "Confirmado" },
    { id: "a-2", time: "10:30", clientName: "Paula Siqueira", serviceName: "Corte feminino", status: "Em espera" },
    { id: "a-3", time: "14:00", clientName: "Julia Tavares", serviceName: "Limpeza de pele", status: "Confirmado" },
  ];

  return (
    <section className="space-y-5">
      <PageHeader
        title="Visao geral"
        description="Acompanhe os principais indicadores da operacao e execute acoes com rapidez."
        badgeText="Hoje"
        actions={<Button variant="outline">Atualizar dados</Button>}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Agendamentos hoje" value="18" trend="+12% vs ontem" icon={<CalendarDays className="size-4 text-muted-foreground" />} />
        <KpiCard title="Clientes ativos" value="236" trend="+9 novos" icon={<Users className="size-4 text-muted-foreground" />} />
        <KpiCard title="Receita do dia" value="R$ 2.840" trend="Ticket medio R$ 157" icon={<Wallet className="size-4 text-muted-foreground" />} />
        <KpiCard title="Servico destaque" value="Escova + Hidratacao" trend="14 atendimentos" icon={<Scissors className="size-4 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Proximos agendamentos</h2>
            <Button variant="outline" size="sm">Ver agenda completa</Button>
          </div>
          <Separator className="my-4" />
          <AppointmentList items={appointments} />
        </article>

        <QuickActions
          actions={[
            { id: "qa-1", label: "Novo atendimento", variant: "default" },
            { id: "qa-2", label: "Registrar despesa" },
            { id: "qa-3", label: "Cadastrar servico" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
          <h2 className="text-base font-semibold">Feature Clients</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Componentes reais da feature de clientes, com composicao por modulo.
          </p>
          <Separator className="my-4" />
          <div className="space-y-3">
            <ClientCard
              name="Mariana Prado"
              email="mariana@exemplo.com"
              phone="(11) 99999-9999"
              lastVisitLabel="Ultima visita: hoje"
            />
            <ClientCard
              name="Renata Mota"
              email="renata@exemplo.com"
              phone="(11) 98888-8888"
              lastVisitLabel="Ultima visita: 3 dias"
            />
          </div>
        </article>

        <div className="space-y-4">
          <ClientMetrics activeClients={236} newThisMonth={28} />
          <EmptyState
            title="Sem campanhas ativas"
            description="Crie uma campanha de retorno para clientes inativos e aumente a recorrencia."
            actionLabel="Criar campanha"
          />
          <Loading label="Sincronizando indicadores" />
        </div>
      </div>
    </section>
  );
}
