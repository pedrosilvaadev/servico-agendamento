"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Scissors,
  Users,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";

type AppShellProps = {
  children: React.ReactNode;
};

type NavigationItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/agenda",
    label: "Agenda",
    icon: CalendarDays,
  },
  {
    href: "/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    href: "/servicos",
    label: "Servicos",
    icon: Scissors,
  },
  {
    href: "/financeiro",
    label: "Financeiro",
    icon: Wallet,
  },
];

function SideNavigation({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium transition",
              compact ? "justify-center px-2" : "justify-start",
              isActive
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {!compact && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: AppShellProps) {
  const {
    sidebarMode,
    toggleSidebarMode,
    isMobileSidebarOpen,
    setMobileSidebarOpen,
  } = useUIStore((state) => ({
    sidebarMode: state.sidebarMode,
    toggleSidebarMode: state.toggleSidebarMode,
    isMobileSidebarOpen: state.isMobileSidebarOpen,
    setMobileSidebarOpen: state.setMobileSidebarOpen,
  }));

  const isCompact = sidebarMode === "collapsed";

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_0%_-20%,oklch(0.95_0.03_210/.6),transparent),radial-gradient(900px_500px_at_100%_0%,oklch(0.94_0.02_35/.55),transparent)]">
      <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-xs border-r border-border/70 p-0">
          <SheetHeader className="space-y-2 px-5 pt-5 pb-3 text-left">
            <SheetTitle className="text-base">StudioFlow</SheetTitle>
            <SheetDescription>
              Navegue pelas areas do sistema e gerencie sua rotina.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="px-4 py-4">
            <SideNavigation />
          </div>
        </SheetContent>
      </Sheet>

      <div className="mx-auto flex w-full max-w-[1480px] gap-0 p-3 md:p-4">
        <aside
          className={cn(
            "hidden md:flex md:flex-col md:rounded-2xl md:border md:border-border/70 md:bg-card/80 md:backdrop-blur",
            isCompact ? "md:w-20" : "md:w-64",
          )}
        >
          <div className={cn("flex items-center", isCompact ? "justify-center px-2 py-4" : "justify-between px-4 py-4")}>
            {!isCompact && (
              <div>
                <p className="text-sm font-semibold tracking-wide">StudioFlow</p>
                <p className="text-xs text-muted-foreground">Clinicas e beleza</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleSidebarMode}
              aria-label="Alternar tamanho da barra lateral"
            >
              {isCompact ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
          <Separator />
          <div className="flex-1 px-3 py-4">
            <SideNavigation compact={isCompact} />
          </div>
        </aside>

        <div className="flex min-h-[calc(100vh-1.5rem)] flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-[0_1px_2px_rgba(10,14,20,0.08),0_10px_35px_rgba(10,14,20,0.05)] backdrop-blur">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-background/85 px-3 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu />
              </Button>
              <div>
                <h1 className="text-base font-semibold leading-none md:text-lg">Painel operacional</h1>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">Controle sua agenda, clientes e caixa em um so lugar.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Operacao ativa
              </Badge>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Novo cliente
              </Button>
              <Button size="sm">Novo agendamento</Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto px-3 py-4 md:px-6 md:py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
