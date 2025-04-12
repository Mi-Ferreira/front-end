import { Role } from './enums/Role';

export interface Sign {
  email: string;
  password: string;
  role: Role;
}
