"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateAppointmentCardProps = {
  onCreate: (payload: { clientName: string; serviceName: string; time: string }) => void;
};

export function CreateAppointmentCard({ onCreate }: CreateAppointmentCardProps) {
  const [clientName, setClientName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!clientName || !serviceName || !time) {
      return;
    }

    onCreate({ clientName, serviceName, time });
    setClientName("");
    setServiceName("");
    setTime("");
  }

  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <h3 className="text-base font-semibold">Criar agendamento</h3>
      <form className="mt-3 space-y-2" onSubmit={handleSubmit}>
        <Input
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          placeholder="Nome do cliente"
        />
        <Input
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          placeholder="Servico"
        />
        <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        <Button className="w-full" type="submit">
          Adicionar na agenda
        </Button>
      </form>
    </article>
  );
}
