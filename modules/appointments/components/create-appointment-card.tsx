"use client";

import { useState } from "react";

import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateAppointmentCardProps = {
  onCreate: (payload: { clientName: string; serviceName: string; time: string }) => Promise<void> | void;
};

export function CreateAppointmentCard({ onCreate }: CreateAppointmentCardProps) {
  const [clientName, setClientName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    if (!clientName || !serviceName || !time) {
      setFeedback({
        type: "error",
        message: "Preencha cliente, serviço e horário para criar o agendamento.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onCreate({ clientName, serviceName, time });
      setClientName("");
      setServiceName("");
      setTime("");
      setFeedback({
        type: "success",
        message: "Agendamento criado com sucesso.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao criar agendamento.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
      <h3 className="text-base font-semibold">Criar agendamento</h3>
      <form className="mt-3 space-y-2" onSubmit={handleSubmit}>
        {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}
        <Input
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          placeholder="Nome do cliente"
          disabled={isSubmitting}
        />
        <Input
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          placeholder="Servico"
          disabled={isSubmitting}
        />
        <Input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          disabled={isSubmitting}
        />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loading label="Salvando..." className="text-inherit" /> : "Adicionar na agenda"}
        </Button>
      </form>
    </article>
  );
}
