import { create } from "zustand";

export type CalendarViewMode = "day" | "week" | "month";

type ScheduleContextStore = {
  selectedDate: Date;
  selectedClientId: string | null;
  selectedServiceId: string | null;
  selectedAppointmentId: string | null;
  viewMode: CalendarViewMode;
  timezone: string;
  setSelectedDate: (date: Date) => void;
  shiftSelectedDateByDays: (days: number) => void;
  setSelectedClientId: (clientId: string | null) => void;
  setSelectedServiceId: (serviceId: string | null) => void;
  setSelectedAppointmentId: (appointmentId: string | null) => void;
  setViewMode: (mode: CalendarViewMode) => void;
  setTimezone: (timezone: string) => void;
  resetContext: () => void;
};

const initialState = {
  selectedDate: new Date(),
  selectedClientId: null,
  selectedServiceId: null,
  selectedAppointmentId: null,
  viewMode: "week" as CalendarViewMode,
  timezone: "America/Sao_Paulo",
};

export const useScheduleContextStore = create<ScheduleContextStore>((set, get) => ({
  ...initialState,
  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },
  shiftSelectedDateByDays: (days) => {
    const current = get().selectedDate;
    const next = new Date(current);
    next.setDate(current.getDate() + days);

    set({ selectedDate: next });
  },
  setSelectedClientId: (clientId) => {
    set({ selectedClientId: clientId });
  },
  setSelectedServiceId: (serviceId) => {
    set({ selectedServiceId: serviceId });
  },
  setSelectedAppointmentId: (appointmentId) => {
    set({ selectedAppointmentId: appointmentId });
  },
  setViewMode: (mode) => {
    set({ viewMode: mode });
  },
  setTimezone: (timezone) => {
    set({ timezone });
  },
  resetContext: () => {
    set(initialState);
  },
}));
