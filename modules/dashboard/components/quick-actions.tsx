import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type QuickAction = {
  id: string;
  label: string;
  variant?: "default" | "outline";
};

type QuickActionsProps = {
  actions: QuickAction[];
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
      <h2 className="text-base font-semibold">Acoes rapidas</h2>
      <Separator className="my-4" />
      <div className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            className="w-full justify-between"
            size="lg"
            variant={action.variant ?? "outline"}
          >
            {action.label}
            <ArrowUpRight className="size-4" />
          </Button>
        ))}
      </div>
    </article>
  );
}
