"use client";

import { CreateAppointmentForm } from "@/modules/appointments/components/create-appointment-form";
import { CreateClientForm } from "@/modules/clients/components/create-client-form";
import { CreateServiceForm } from "@/modules/services/components/create-service-form";
import { useUIStore } from "@/store";

const modalText = {
  createClient: {
    title: "Novo cliente",
    description: "Cadastre um cliente para iniciar os atendimentos.",
  },
  createService: {
    title: "Novo serviço",
    description: "Adicione um serviço ao catálogo da clínica/salão.",
  },
  createAppointment: {
    title: "Novo agendamento",
    description: "Agende um novo atendimento com cliente e serviço.",
  },
} as const;

export function QuickCreatePanel() {
  const activeModal = useUIStore((state) => state.activeModal);
  const closeModal = useUIStore((state) => state.closeModal);

  if (!activeModal || !(activeModal.type in modalText)) {
    return null;
  }

  const modalInfo = modalText[activeModal.type as keyof typeof modalText];

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">{modalInfo.title}</h3>
        <p className="text-sm text-muted-foreground">{modalInfo.description}</p>
      </div>

      {activeModal.type === "createClient" ? <CreateClientForm onSuccess={closeModal} /> : null}
      {activeModal.type === "createService" ? <CreateServiceForm onSuccess={closeModal} /> : null}
      {activeModal.type === "createAppointment" ? <CreateAppointmentForm onSuccess={closeModal} /> : null}
    </div>
  );
}
