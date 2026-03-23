import { Badge } from "@/components/ui/badge";

type ClientInactivityBadgeProps = {
  inactiveDays: number;
};

export function ClientInactivityBadge({ inactiveDays }: ClientInactivityBadgeProps) {
  if (inactiveDays <= 15) {
    return <Badge variant="secondary">Ativo</Badge>;
  }

  if (inactiveDays <= 30) {
    return <Badge variant="outline">Atenção: {inactiveDays} dias</Badge>;
  }

  return <Badge variant="destructive">Inativo: {inactiveDays} dias</Badge>;
}
