import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@studioflow.local";

export async function ensureDemoUser() {
  return prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {},
    create: {
      name: "StudioFlow Demo",
      email: DEMO_USER_EMAIL,
      phone: "(11) 90000-0000",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
