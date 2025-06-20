export interface UserPayloadInterface {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
