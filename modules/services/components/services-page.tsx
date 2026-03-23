import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ServiceList } from "@/modules/services/components/service-list";

const services = [
  { id: "s1", name: "Escova", durationMinute: 45, priceLabel: "R$ 140", isActive: true },
  { id: "s2", name: "Coloracao", durationMinute: 90, priceLabel: "R$ 320", isActive: true },
  { id: "s3", name: "Hidratacao", durationMinute: 50, priceLabel: "R$ 170", isActive: true },
  { id: "s4", name: "Progressiva", durationMinute: 120, priceLabel: "R$ 420", isActive: false },
];

export function ServicesPage() {
  return (
    <section className="space-y-5">
      <PageHeader
        title="Servicos"
        description="Catalogo de servicos com foco em operacao mobile e desktop."
        badgeText={`${services.length} itens`}
        actions={<Button>Novo servico</Button>}
      />

      <ServiceList items={services} />
    </section>
  );
}
