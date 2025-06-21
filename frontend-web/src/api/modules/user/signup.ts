import { api } from "@/api/lib/axios";

export interface SignupDTO {
    name: string;
    email: string;
    phone?: string;
    password: string;
    privacy_consent: boolean
}

export async function Signup(data: SignupDTO) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}