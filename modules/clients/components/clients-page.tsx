"use client";

import { useMemo } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { clientsMock } from "@/lib/mock-data";
import { ClientCard } from "@/modules/clients/components/client-card";
import { ClientInactivityBadge } from "@/modules/clients/components/client-inactivity-badge";
import { ClientMetrics } from "@/modules/clients/components/client-metrics";
import { ClientsSearch } from "@/modules/clients/components/clients-search";
import { useFiltersStore } from "@/store";

export function ClientsPage() {
  const search = useFiltersStore((state) => state.search);
  const setSearch = useFiltersStore((state) => state.setSearch);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return clientsMock;
    }

    return clientsMock.filter((client) => {
      return (
        client.name.toLowerCase().includes(term)
        || client.email.toLowerCase().includes(term)
        || client.phone.toLowerCase().includes(term)
      );
    });
  }, [search]);

  const inactiveCount = filteredClients.filter((client) => client.lastVisitDays > 30).length;

  return (
    <section className="space-y-5">
      <PageHeader
        title="Clientes"
        description="Listagem com busca e indicador de inatividade para ações de retenção."
        badgeText={`${filteredClients.length} registros`}
        actions={<Button>Novo cliente</Button>}
      />

      <ClientMetrics activeClients={clientsMock.length} newThisMonth={28} />

      <article className="space-y-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ClientsSearch value={search} onChange={setSearch} />
          <p className="text-sm text-muted-foreground">
            Inativos (&gt;30 dias): <span className="font-semibold text-foreground">{inactiveCount}</span>
          </p>
        </div>

        {filteredClients.length === 0 ? (
          <EmptyState
            title="Nenhum cliente encontrado"
            description="Ajuste sua busca ou cadastre um novo cliente para começar."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {filteredClients.map((client) => (
              <div key={client.id} className="space-y-2">
                <ClientCard
                  name={client.name}
                  email={client.email}
                  phone={client.phone}
                  lastVisitLabel={`Última visita: ${client.lastVisitDays} dia(s)`}
                />
                <ClientInactivityBadge inactiveDays={client.lastVisitDays} />
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
