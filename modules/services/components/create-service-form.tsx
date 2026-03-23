"use client";

import { useState } from "react";

import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createServiceFromFormAction } from "@/modules/services/actions/create-service-from-form.action";

type CreateServiceFormProps = {
  onSuccess: () => void;
};

export function CreateServiceForm({ onSuccess }: CreateServiceFormProps) {
  const [name, setName] = useState("");
  const [durationMinute, setDurationMinute] = useState("60");
  const [price, setPrice] = useState("120");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const result = await createServiceFromFormAction({
      name,
      durationMinute: Number(durationMinute),
      price: Number(price),
    });

    if (!result.success) {
      setFeedback({ type: "error", message: result.error });
      setIsSubmitting(false);
      return;
    }

    setFeedback({ type: "success", message: `Serviço ${result.data.name} criado com sucesso.` });
    setTimeout(() => onSuccess(), 700);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}
      <Input placeholder="Nome do serviço" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
      <Input
        placeholder="Duração (min)"
        type="number"
        min={1}
        value={durationMinute}
        onChange={(e) => setDurationMinute(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        placeholder="Preço"
        type="number"
        min={1}
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isSubmitting}
      />
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loading label="Criando serviço..." className="text-inherit" /> : "Criar serviço"}
      </Button>
    </form>
  );
}
