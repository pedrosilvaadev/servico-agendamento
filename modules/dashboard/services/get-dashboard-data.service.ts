import {
  AppointmentStatus,
  Prisma,
  PrismaClient,
  TransactionType,
} from "@/app/generated/prisma/client";
import {
  GetDashboardDataInput,
  getDashboardDataSchema,
} from "@/modules/dashboard/schemas/get-dashboard-data.schema";

export type DashboardTotals = {
  revenue: number;
  expense: number;
  balance: number;
};

export type DashboardAppointments = {
  total: number;
  scheduled: number;
  confirmed: number;
  done: number;
  canceled: number;
  noShow: number;
};

export type DashboardTopService = {
  serviceId: string;
  name: string;
  appointments: number;
  revenue: number;
};

export type DashboardRecentTransaction = {
  id: string;
  type: TransactionType;
  amount: number;
  occurredAt: Date;
  appointmentId: string | null;
  description: string | null;
};

export type GetDashboardDataResult = {
  range: {
    from: Date;
    to: Date;
  };
  totals: DashboardTotals;
  appointments: DashboardAppointments;
  topServices: DashboardTopService[];
  recentTransactions: DashboardRecentTransaction[];
};

type DateRange = {
  from: Date;
  to: Date;
};

function defaultDateRange(): DateRange {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  return { from, to };
}

function parseRange(input: GetDashboardDataInput): DateRange {
  if (!input.from && !input.to) {
    return defaultDateRange();
  }

  return {
    from: input.from ?? defaultDateRange().from,
    to: input.to ?? new Date(),
  };
}

function decimalToNumber(value: Prisma.Decimal): number {
  return value.toNumber();
}

export async function getDashboardDataService(
  prisma: PrismaClient,
  rawInput: GetDashboardDataInput,
): Promise<GetDashboardDataResult> {
  const input = getDashboardDataSchema.parse(rawInput);
  const range = parseRange(input);

  const transactionWhere = {
    userId: input.userId,
    occurredAt: {
      gte: range.from,
      lte: range.to,
    },
  } as const;

  const appointmentWhere = {
    userId: input.userId,
    scheduledAt: {
      gte: range.from,
      lte: range.to,
    },
  } as const;

  const [incomeAggregate, expenseAggregate, appointmentStatusCounts, topServicesRaw, recentTransactions] =
    await Promise.all([
      prisma.transaction.aggregate({
        where: {
          ...transactionWhere,
          type: TransactionType.INCOME,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.transaction.aggregate({
        where: {
          ...transactionWhere,
          type: TransactionType.EXPENSE,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.appointment.groupBy({
        by: ["status"],
        where: appointmentWhere,
        _count: {
          status: true,
        },
      }),
      prisma.appointment.groupBy({
        by: ["serviceId"],
        where: {
          ...appointmentWhere,
          status: AppointmentStatus.DONE,
        },
        _count: {
          serviceId: true,
        },
        orderBy: {
          _count: {
            serviceId: "desc",
          },
        },
        take: 5,
      }),
      prisma.transaction.findMany({
        where: transactionWhere,
        select: {
          id: true,
          type: true,
          amount: true,
          occurredAt: true,
          appointmentId: true,
          description: true,
        },
        orderBy: {
          occurredAt: "desc",
        },
        take: 10,
      }),
    ]);

  const serviceIds = topServicesRaw.map((item) => item.serviceId);
  const [services, doneAppointments] = await Promise.all([
    prisma.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    }),
    prisma.appointment.findMany({
      where: {
        ...appointmentWhere,
        status: AppointmentStatus.DONE,
        serviceId: {
          in: serviceIds,
        },
      },
      select: {
        serviceId: true,
      },
    }),
  ]);

  const servicesById = new Map(services.map((service) => [service.id, service]));
  const doneCountByService = new Map<string, number>();

  for (const appointment of doneAppointments) {
    doneCountByService.set(
      appointment.serviceId,
      (doneCountByService.get(appointment.serviceId) ?? 0) + 1,
    );
  }

  const topServices: DashboardTopService[] = topServicesRaw
    .map((item) => {
      const service = servicesById.get(item.serviceId);
      if (!service) {
        return null;
      }

      const count = doneCountByService.get(item.serviceId) ?? item._count.serviceId;
      return {
        serviceId: service.id,
        name: service.name,
        appointments: count,
        revenue: count * decimalToNumber(service.price),
      };
    })
    .filter((item): item is DashboardTopService => item !== null);

  const statusCountMap = new Map(
    appointmentStatusCounts.map((item) => [item.status, item._count.status]),
  );

  const revenue = decimalToNumber(incomeAggregate._sum.amount ?? new Prisma.Decimal(0));
  const expense = decimalToNumber(expenseAggregate._sum.amount ?? new Prisma.Decimal(0));

  const appointments: DashboardAppointments = {
    total: Array.from(statusCountMap.values()).reduce((acc, value) => acc + value, 0),
    scheduled: statusCountMap.get(AppointmentStatus.SCHEDULED) ?? 0,
    confirmed: statusCountMap.get(AppointmentStatus.CONFIRMED) ?? 0,
    done: statusCountMap.get(AppointmentStatus.DONE) ?? 0,
    canceled: statusCountMap.get(AppointmentStatus.CANCELED) ?? 0,
    noShow: statusCountMap.get(AppointmentStatus.NO_SHOW) ?? 0,
  };

  return {
    range,
    totals: {
      revenue,
      expense,
      balance: revenue - expense,
    },
    appointments,
    topServices,
    recentTransactions: recentTransactions.map((transaction) => ({
      id: transaction.id,
      type: transaction.type,
      amount: decimalToNumber(transaction.amount),
      occurredAt: transaction.occurredAt,
      appointmentId: transaction.appointmentId,
      description: transaction.description,
    })),
  };
}
