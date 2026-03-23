import { Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type InsightsPanelProps = {
  insights: string[];
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <article className="rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm md:px-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Insights</h2>
        <Badge variant="secondary" className="inline-flex items-center gap-1">
          <Lightbulb className="size-3.5" /> Inteligência
        </Badge>
      </div>
      <Separator className="my-4" />
      <ul className="space-y-2">
        {insights.map((insight) => (
          <li key={insight} className="rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-sm">
            {insight}
          </li>
        ))}
      </ul>
    </article>
  );
}
