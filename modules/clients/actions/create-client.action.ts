"use server";

import { prisma } from "@/lib/prisma";
import { executeAction, ServerActionResult } from "@/lib/server-action";
import {
  CreateClientInput,
  createClientSchema,
} from "@/modules/clients/schemas/client.schema";
import {
  createClientService,
  CreateClientResult,
} from "@/modules/clients/services/create-client.service";

export async function createClient(
  input: CreateClientInput,
): Promise<ServerActionResult<CreateClientResult>> {
  return executeAction(async () => {
    const parsed = createClientSchema.parse(input);

    return createClientService(prisma, parsed);
  });
}

export const createClientAction = createClient;
