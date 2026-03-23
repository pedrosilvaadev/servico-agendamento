"use client";

import { useEffect, useMemo, useState } from "react";

import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAppointmentFromFormAction } from "@/modules/appointments/actions/create-appointment-from-form.action";
import { getAppointmentFormOptionsAction } from "@/modules/appointments/actions/get-appointment-form-options.action";

type AppointmentOption = {
  id: string;
  label: string;
};

type CreateAppointmentFormProps = {
  onSuccess: () => void;
};

function getDefaultDateTimeLocal(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export function CreateAppointmentForm({ onSuccess }: CreateAppointmentFormProps) {
  const [clients, setClients] = useState<AppointmentOption[]>([]);
  const [services, setServices] = useState<AppointmentOption[]>([]);
  const [clientId, setClientId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [scheduledAt, setScheduledAt] = useState(getDefaultDateTimeLocal());
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadOptions() {
      const result = await getAppointmentFormOptionsAction();

      if (!mounted) {
        return;
      }

      if (!result.success) {
        setFeedback({ type: "error", message: result.error });
        setIsBootstrapping(false);
        return;
      }

      setClients(result.data.clients);
      setServices(result.data.services);
      setClientId(result.data.clients[0]?.id ?? "");
      setServiceId(result.data.services[0]?.id ?? "");
      setIsBootstrapping(false);
    }

    loadOptions();

    return () => {
      mounted = false;
    };
  }, []);

  const hasOptions = useMemo(() => clients.length > 0 && services.length > 0, [clients, services]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const result = await createAppointmentFromFormAction({
      clientId,
      serviceId,
      scheduledAt: new Date(scheduledAt).toISOString(),
    });

    if (!result.success) {
      setFeedback({ type: "error", message: result.error });
      setIsSubmitting(false);
      return;
    }

    setFeedback({ type: "success", message: "Agendamento criado com sucesso." });
    setTimeout(() => onSuccess(), 700);
  }

  if (isBootstrapping) {
    return <Loading label="Carregando opções do formulário..." />;
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}

      {!hasOptions ? (
        <FeedbackBanner
          type="info"
          message="Cadastre ao menos um cliente e um serviço para criar agendamentos."
        />
      ) : (
        <>
          <label className="block space-y-1 text-sm">
            <span className="text-muted-foreground">Cliente</span>
            <select
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              disabled={isSubmitting}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1 text-sm">
            <span className="text-muted-foreground">Serviço</span>
            <select
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              disabled={isSubmitting}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.label}
                </option>
              ))}
            </select>
          </label>

          <Input
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => setScheduledAt(event.target.value)}
            disabled={isSubmitting}
          />
        </>
      )}

      <Button className="w-full" type="submit" disabled={isSubmitting || !hasOptions}>
        {isSubmitting ? <Loading label="Criando agendamento..." className="text-inherit" /> : "Criar agendamento"}
      </Button>
    </form>
  );
}
