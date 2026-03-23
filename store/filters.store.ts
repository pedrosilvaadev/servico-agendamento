import { create } from "zustand";

export type AppointmentFilterStatus =
  | "all"
  | "scheduled"
  | "confirmed"
  | "done"
  | "canceled"
  | "no_show";

export type DateRangeFilter = {
  from: Date | null;
  to: Date | null;
};

type FiltersStore = {
  dateRange: DateRangeFilter;
  appointmentStatus: AppointmentFilterStatus;
  serviceId: string | null;
  staffUserId: string | null;
  search: string;
  setDateRange: (range: DateRangeFilter) => void;
  setAppointmentStatus: (status: AppointmentFilterStatus) => void;
  setServiceId: (serviceId: string | null) => void;
  setStaffUserId: (staffUserId: string | null) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
};

const initialState = {
  dateRange: {
    from: null,
    to: null,
  },
  appointmentStatus: "all" as AppointmentFilterStatus,
  serviceId: null,
  staffUserId: null,
  search: "",
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialState,
  setDateRange: (range) => {
    const from = range.from;
    const to = range.to;

    if (from && to && from > to) {
      set({ dateRange: { from: to, to: from } });
      return;
    }

    set({ dateRange: range });
  },
  setAppointmentStatus: (status) => {
    set({ appointmentStatus: status });
  },
  setServiceId: (serviceId) => {
    set({ serviceId });
  },
  setStaffUserId: (staffUserId) => {
    set({ staffUserId });
  },
  setSearch: (search) => {
    set({ search: search.trimStart() });
  },
  resetFilters: () => {
    set(initialState);
  },
}));
