import { AppointmentStatus } from "@/app/generated/prisma/client";

export function shouldGenerateAppointmentRevenue(status: AppointmentStatus): boolean {
  return status === AppointmentStatus.DONE;
}

export function shouldUpdateLastVisit(status: AppointmentStatus): boolean {
  return status === AppointmentStatus.DONE;
}
