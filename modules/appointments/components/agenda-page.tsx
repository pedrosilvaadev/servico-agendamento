"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { appointmentsMock } from "@/lib/mock-data";
import { AppointmentList } from "@/modules/appointments/components/appointment-list";
import { CreateAppointmentCard } from "@/modules/appointments/components/create-appointment-card";
import { ScheduleViewToggle } from "@/modules/appointments/components/schedule-view-toggle";
import { useScheduleContextStore } from "@/store";

type LocalAppointment = {
  id: string;
  date: string;
  time: string;
  clientName: string;
  serviceName: string;
  status: "Confirmado" | "Em espera" | "Concluido";
};

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function startOfWeek(date: Date): Date {
  const base = new Date(date);
  const day = base.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  base.setDate(base.getDate() + offset);
  base.setHours(0, 0, 0, 0);
  return base;
}

function endOfWeek(date: Date): Date {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function AgendaPage() {
  const selectedDate = useScheduleContextStore((state) => state.selectedDate);
  const setSelectedDate = useScheduleContextStore((state) => state.setSelectedDate);
  const shiftSelectedDateByDays = useScheduleContextStore((state) => state.shiftSelectedDateByDays);
  const viewMode = useScheduleContextStore((state) => state.viewMode);
  const setViewMode = useScheduleContextStore((state) => state.setViewMode);

  const [appointments, setAppointments] = useState<LocalAppointment[]>(appointmentsMock);

  const visibleAppointments = useMemo(() => {
    const targetDate = toIsoDate(selectedDate);

    if (viewMode === "day") {
      return appointments.filter((appointment) => appointment.date === targetDate);
    }

    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T00:00:00`);
      return appointmentDate >= weekStart && appointmentDate <= weekEnd;
    });
  }, [appointments, selectedDate, viewMode]);

  function handleCreate(payload: { clientName: string; serviceName: string; time: string }) {
    const newAppointment: LocalAppointment = {
      id: crypto.randomUUID(),
      date: toIsoDate(selectedDate),
      time: payload.time,
      clientName: payload.clientName,
      serviceName: payload.serviceName,
      status: "Em espera",
    };

    setAppointments((previous) => [newAppointment, ...previous]);
  }

  return (
    <section className="space-y-5">
      <PageHeader
        title="Agenda"
        description="Visualização por dia/semana e criação rápida de novos agendamentos."
        badgeText={viewMode === "day" ? "Visão diária" : "Visão semanal"}
      />

      <article className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <ScheduleViewToggle value={viewMode} onChange={setViewMode} />

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => shiftSelectedDateByDays(viewMode === "day" ? -1 : -7)}>
            Anterior
          </Button>
          <input
            type="date"
            value={toIsoDate(selectedDate)}
            onChange={(event) => setSelectedDate(new Date(`${event.target.value}T00:00:00`))}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          />
          <Button variant="outline" size="sm" onClick={() => shiftSelectedDateByDays(viewMode === "day" ? 1 : 7)}>
            Próximo
          </Button>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
        <article className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold">
            {viewMode === "day" ? "Agendamentos do dia" : "Agendamentos da semana"}
          </h3>
          <AppointmentList
            items={visibleAppointments.map((item) => ({
              id: item.id,
              time: item.time,
              clientName: item.clientName,
              serviceName: item.serviceName,
              status: item.status,
            }))}
          />
        </article>

        <CreateAppointmentCard onCreate={handleCreate} />
      </div>
    </section>
  );
}
