import { ArrowUpRight, CalendarDays, Scissors, Users, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted-foreground">Agendamentos hoje</p>
            <CalendarDays className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight">18</p>
          <Badge variant="secondary" className="mt-3">+12% vs ontem</Badge>
        </article>

        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted-foreground">Clientes ativos</p>
            <Users className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight">236</p>
          <Badge variant="secondary" className="mt-3">+9 novos</Badge>
        </article>

        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted-foreground">Receita do dia</p>
            <Wallet className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight">R$ 2.840</p>
          <Badge variant="secondary" className="mt-3">Ticket medio R$ 157</Badge>
        </article>

        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted-foreground">Servico destaque</p>
            <Scissors className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-3 text-xl font-semibold tracking-tight">Escova + Hidratacao</p>
          <Badge variant="secondary" className="mt-3">14 atendimentos</Badge>
        </article>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Proximos agendamentos</h2>
            <Button variant="outline" size="sm">Ver agenda completa</Button>
          </div>
          <Separator className="my-4" />

          <div className="space-y-3">
            {[
              { time: "09:00", client: "Marina Alves", service: "Coloracao", status: "Confirmado" },
              { time: "10:30", client: "Paula Siqueira", service: "Corte feminino", status: "Em espera" },
              { time: "14:00", client: "Julia Tavares", service: "Limpeza de pele", status: "Confirmado" },
            ].map((item) => (
              <div
                key={`${item.time}-${item.client}`}
                className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">{item.time}</div>
                  <div>
                    <p className="text-sm font-medium">{item.client}</p>
                    <p className="text-xs text-muted-foreground">{item.service}</p>
                  </div>
                </div>
                <Badge variant="outline">{item.status}</Badge>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
          <h2 className="text-base font-semibold">Acoes rapidas</h2>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Button className="w-full justify-between" size="lg">
              Novo atendimento
              <ArrowUpRight className="size-4" />
            </Button>
            <Button className="w-full justify-between" size="lg" variant="outline">
              Registrar despesa
              <ArrowUpRight className="size-4" />
            </Button>
            <Button className="w-full justify-between" size="lg" variant="outline">
              Cadastrar servico
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Fluxo otimizado para operacao rapida no desktop e no celular.
          </p>
        </article>
      </div>
    </section>
  );
}
