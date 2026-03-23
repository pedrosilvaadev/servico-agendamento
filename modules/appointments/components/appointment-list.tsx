import { AppointmentCard } from "@/modules/appointments/components/appointment-card";

type AppointmentItem = {
  id: string;
  time: string;
  clientName: string;
  serviceName: string;
  status: string;
};

type AppointmentListProps = {
  items: AppointmentItem[];
};

export function AppointmentList({ items }: AppointmentListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AppointmentCard
          key={item.id}
          time={item.time}
          clientName={item.clientName}
          serviceName={item.serviceName}
          status={item.status}
        />
      ))}
    </div>
  );
}
