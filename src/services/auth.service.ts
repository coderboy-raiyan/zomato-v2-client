import { THttpOptions } from "@/types";
import httpService from "./http.service";

class AuthService {
  async createCustomer(payload: any, options?: THttpOptions) {
    const data = await httpService.post(
      "/customers/register",
      payload,
      options,
    );
    return data;
  }
  async createProvider(payload: any, options?: THttpOptions) {
    const data = await httpService.post(
      "/providers/register",
      payload,
      options,
    );
    return data;
  }
}

const authService = new AuthService();

export default authService;
