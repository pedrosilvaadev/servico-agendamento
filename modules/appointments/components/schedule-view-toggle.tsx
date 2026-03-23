"use client";

import { CalendarDays, Columns2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CalendarViewMode } from "@/store";

type ScheduleViewToggleProps = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
};

export function ScheduleViewToggle({ value, onChange }: ScheduleViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border/70 p-1">
      <Button
        size="sm"
        variant={value === "day" ? "default" : "ghost"}
        onClick={() => onChange("day")}
      >
        <CalendarDays className="size-4" />
        Dia
      </Button>
      <Button
        size="sm"
        variant={value === "week" ? "default" : "ghost"}
        onClick={() => onChange("week")}
      >
        <Columns2 className="size-4" />
        Semana
      </Button>
    </div>
  );
}
