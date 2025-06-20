import type { Role } from "./role.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  privacy_consent: boolean;
  address: string | null;
  role: Role;
  created_at: Date;
  updated_at: Date;
}