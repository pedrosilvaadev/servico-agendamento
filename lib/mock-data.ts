export type DashboardMetric = {
  id: string;
  title: string;
  value: string;
  trend: string;
};

export type RevenuePoint = {
  label: string;
  value: number;
};

export type ClientRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisitDays: number;
};

export type AppointmentRow = {
  id: string;
  date: string;
  time: string;
  clientName: string;
  serviceName: string;
  status: "Confirmado" | "Em espera" | "Concluido";
};

export type TransactionRow = {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  occurredAtLabel: string;
};

export const dashboardMetrics: DashboardMetric[] = [
  { id: "m1", title: "Agendamentos hoje", value: "18", trend: "+12% vs ontem" },
  { id: "m2", title: "Clientes ativos", value: "236", trend: "+9 novos" },
  { id: "m3", title: "Receita do dia", value: "R$ 2.840", trend: "Ticket medio R$ 157" },
  { id: "m4", title: "Servico destaque", value: "Escova + Hidratacao", trend: "14 atendimentos" },
];

export const revenueSeries: RevenuePoint[] = [
  { label: "Seg", value: 2300 },
  { label: "Ter", value: 2650 },
  { label: "Qua", value: 2510 },
  { label: "Qui", value: 3180 },
  { label: "Sex", value: 3420 },
  { label: "Sab", value: 3890 },
  { label: "Dom", value: 1400 },
];

export const clientsMock: ClientRow[] = [
  { id: "c1", name: "Mariana Prado", email: "mariana@exemplo.com", phone: "(11) 99999-9999", lastVisitDays: 0 },
  { id: "c2", name: "Renata Mota", email: "renata@exemplo.com", phone: "(11) 98888-8888", lastVisitDays: 3 },
  { id: "c3", name: "Patricia Lima", email: "patricia@exemplo.com", phone: "(11) 97777-7777", lastVisitDays: 22 },
  { id: "c4", name: "Camila Duarte", email: "camila@exemplo.com", phone: "(11) 96666-6666", lastVisitDays: 41 },
  { id: "c5", name: "Giovana Neves", email: "giovana@exemplo.com", phone: "(11) 95555-5555", lastVisitDays: 65 },
];

export const appointmentsMock: AppointmentRow[] = [
  { id: "a1", date: "2026-03-22", time: "09:00", clientName: "Mariana Prado", serviceName: "Coloracao", status: "Confirmado" },
  { id: "a2", date: "2026-03-22", time: "10:30", clientName: "Renata Mota", serviceName: "Corte feminino", status: "Em espera" },
  { id: "a3", date: "2026-03-22", time: "14:00", clientName: "Giovana Neves", serviceName: "Limpeza de pele", status: "Confirmado" },
  { id: "a4", date: "2026-03-23", time: "09:30", clientName: "Patricia Lima", serviceName: "Manicure", status: "Concluido" },
  { id: "a5", date: "2026-03-24", time: "13:00", clientName: "Camila Duarte", serviceName: "Escova", status: "Confirmado" },
  { id: "a6", date: "2026-03-25", time: "15:00", clientName: "Mariana Prado", serviceName: "Hidratacao", status: "Em espera" },
  { id: "a7", date: "2026-03-26", time: "11:00", clientName: "Renata Mota", serviceName: "Progressiva", status: "Confirmado" },
  { id: "a8", date: "2026-03-27", time: "16:00", clientName: "Patricia Lima", serviceName: "Pedicure", status: "Concluido" },
];

export const transactionsMock: TransactionRow[] = [
  { id: "t1", description: "Atendimento - Coloracao", amount: 320, type: "INCOME", occurredAtLabel: "22/03 09:20" },
  { id: "t2", description: "Compra de produtos", amount: 180, type: "EXPENSE", occurredAtLabel: "22/03 11:15" },
  { id: "t3", description: "Atendimento - Escova", amount: 140, type: "INCOME", occurredAtLabel: "22/03 14:45" },
  { id: "t4", description: "Aluguel", amount: 1200, type: "EXPENSE", occurredAtLabel: "21/03 08:00" },
  { id: "t5", description: "Atendimento - Limpeza de pele", amount: 260, type: "INCOME", occurredAtLabel: "21/03 16:10" },
];
