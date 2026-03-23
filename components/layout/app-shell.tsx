"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { AppHeader } from "@/components/shared/layout/header";
import { MobileBottomNav } from "@/components/shared/layout/mobile-bottom-nav";
import { QuickCreatePanel } from "@/components/shared/layout/quick-create-panel";
import { Sidebar } from "@/components/shared/layout/sidebar";
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

export function AppShell({ children }: AppShellProps) {
  const sidebarMode = useUIStore((state) => state.sidebarMode);
  const toggleSidebarMode = useUIStore((state) => state.toggleSidebarMode);
  const isMobileSidebarOpen = useUIStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);
  const activeModal = useUIStore((state) => state.activeModal);
  const closeModal = useUIStore((state) => state.closeModal);

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
            <Sidebar onNavigate={() => setMobileSidebarOpen(false)} />
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
            <Sidebar compact={isCompact} />
          </div>
        </aside>

        <div className="flex min-h-[calc(100vh-1.5rem)] flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-[0_1px_2px_rgba(10,14,20,0.08),0_10px_35px_rgba(10,14,20,0.05)] backdrop-blur">
          <AppHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

          <main className="flex-1 overflow-auto px-3 pt-4 pb-20 md:px-6 md:py-6">{children}</main>
        </div>
      </div>

      <Sheet open={Boolean(activeModal)} onOpenChange={(isOpen) => { if (!isOpen) closeModal(); }}>
        <SheetContent side="right" className="w-[92vw] max-w-md border-l border-border/70 p-5">
          <QuickCreatePanel />
        </SheetContent>
      </Sheet>

      <MobileBottomNav />
    </div>
  );
}
