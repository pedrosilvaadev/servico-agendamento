"use server";

import { prisma } from "@/lib/prisma";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import {
  GetDashboardDataInput,
  getDashboardDataSchema,
} from "@/modules/dashboard/schemas/get-dashboard-data.schema";
import {
  getDashboardDataService,
  GetDashboardDataResult,
} from "@/modules/dashboard/services/get-dashboard-data.service";

export async function getDashboardData(
  input: GetDashboardDataInput,
): Promise<ServerActionResult<GetDashboardDataResult>> {
  return executeAction(async () => {
    const parsed = getDashboardDataSchema.parse(input);

    return getDashboardDataService(prisma, parsed);
  });
}

export const getDashboardDataAction = getDashboardData;
