"use client";

import { Menu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  onOpenMobileSidebar: () => void;
  onOpenCreateClient: () => void;
  onOpenCreateService: () => void;
  onOpenCreateAppointment: () => void;
};

export function AppHeader({
  onOpenMobileSidebar,
  onOpenCreateClient,
  onOpenCreateService,
  onOpenCreateAppointment,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-background/85 px-3 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="md:hidden"
          onClick={onOpenMobileSidebar}
          aria-label="Abrir menu"
        >
          <Menu />
        </Button>
        <div>
          <h1 className="text-base font-semibold leading-none md:text-lg">Painel operacional</h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            Controle sua agenda, clientes e caixa em um so lugar.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Operacao ativa
        </Badge>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={onOpenCreateClient}>
          Novo cliente
        </Button>
        <Button variant="outline" size="sm" className="hidden lg:inline-flex" onClick={onOpenCreateService}>
          Novo servico
        </Button>
        <Button size="sm" onClick={onOpenCreateAppointment}>Novo agendamento</Button>
      </div>
    </header>
  );
}
