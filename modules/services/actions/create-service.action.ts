"use server";

import { prisma } from "@/lib/prisma";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import {
  CreateServiceInput,
  createServiceSchema,
} from "@/modules/services/schemas/service.schema";
import {
  createServiceService,
  CreateServiceResult,
} from "@/modules/services/services/create-service.service";

export async function createService(
  input: CreateServiceInput,
): Promise<ServerActionResult<CreateServiceResult>> {
  return executeAction(async () => {
    const parsed = createServiceSchema.parse(input);

    return createServiceService(prisma, parsed);
  });
}

export const createServiceAction = createService;
