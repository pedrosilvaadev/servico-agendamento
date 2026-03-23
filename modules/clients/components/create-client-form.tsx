"use client";

import { useState } from "react";

import { FeedbackBanner } from "@/components/shared/feedback-banner";
import { Loading } from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientFromFormAction } from "@/modules/clients/actions/create-client-from-form.action";

type CreateClientFormProps = {
  onSuccess: () => void;
};

export function CreateClientForm({ onSuccess }: CreateClientFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const result = await createClientFromFormAction({ name, email, phone });

    if (!result.success) {
      setFeedback({ type: "error", message: result.error });
      setIsSubmitting(false);
      return;
    }

    setFeedback({ type: "success", message: `Cliente ${result.data.name} criado com sucesso.` });
    setTimeout(() => onSuccess(), 700);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      {feedback ? <FeedbackBanner type={feedback.type} message={feedback.message} /> : null}
      <Input placeholder="Nome do cliente" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
      <Input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
      <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSubmitting} />
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loading label="Criando cliente..." className="text-inherit" /> : "Criar cliente"}
      </Button>
    </form>
  );
}
