import { ServiceCard } from "@/modules/services/components/service-card";

type ServiceItem = {
  id: string;
  name: string;
  durationMinute: number;
  priceLabel: string;
  isActive: boolean;
};

type ServiceListProps = {
  items: ServiceItem[];
};

export function ServiceList({ items }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <ServiceCard
          key={item.id}
          name={item.name}
          durationMinute={item.durationMinute}
          priceLabel={item.priceLabel}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
}
