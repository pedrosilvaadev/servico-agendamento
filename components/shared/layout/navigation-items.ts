import {
  CalendarDays,
  LayoutDashboard,
  Scissors,
  Users,
  Wallet,
} from "lucide-react";

export type NavigationItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/servicos", label: "Servicos", icon: Scissors },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
];
