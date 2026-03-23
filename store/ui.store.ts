import { create } from "zustand";

export type ModalType =
  | "createClient"
  | "createService"
  | "createAppointment"
  | "createTransaction"
  | "appointmentDetails";

export type SidebarMode = "expanded" | "collapsed";

type ModalState = {
  type: ModalType;
  payload?: Record<string, string | number | boolean | null>;
};

type UIStore = {
  sidebarMode: SidebarMode;
  isMobileSidebarOpen: boolean;
  activeModal: ModalState | null;
  setSidebarMode: (mode: SidebarMode) => void;
  toggleSidebarMode: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  openModal: (type: ModalType, payload?: Record<string, string | number | boolean | null>) => void;
  closeModal: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  sidebarMode: "expanded",
  isMobileSidebarOpen: false,
  activeModal: null,
  setSidebarMode: (mode) => {
    set({ sidebarMode: mode });
  },
  toggleSidebarMode: () => {
    set((state) => ({
      sidebarMode: state.sidebarMode === "expanded" ? "collapsed" : "expanded",
    }));
  },
  setMobileSidebarOpen: (isOpen) => {
    set({ isMobileSidebarOpen: isOpen });
  },
  openModal: (type, payload) => {
    set({ activeModal: { type, payload } });
  },
  closeModal: () => {
    set({ activeModal: null });
  },
}));
