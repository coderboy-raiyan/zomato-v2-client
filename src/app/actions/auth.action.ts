"use server";

import authService from "@/services/auth.service";
import { Provider } from "../../../generated/prisma/client";

export async function createProvider(payload: Partial<Provider>) {
  const res = await authService.createProvider(payload);
  return res;
}
