import { Badge } from "@/components/ui/badge";

type AppointmentCardProps = {
  time: string;
  clientName: string;
  serviceName: string;
  status: string;
};

export function AppointmentCard({ time, clientName, serviceName, status }: AppointmentCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold">{time}</div>
        <div>
          <p className="text-sm font-medium">{clientName}</p>
          <p className="text-xs text-muted-foreground">{serviceName}</p>
        </div>
      </div>
      <Badge variant="outline">{status}</Badge>
    </article>
  );
}
