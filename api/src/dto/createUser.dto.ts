import { Role } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  address: string;
  password: string;
  role?: Role;
}
