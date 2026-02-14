import { THttpOptions } from "@/types";
import httpService from "./http.service";

class AuthService {
  async createCustomer(payload: any, options?: THttpOptions) {
    const data = await httpService.post("/auth/register-customer", payload);
    return data;
  }
}

const authService = new AuthService();

export default authService;
