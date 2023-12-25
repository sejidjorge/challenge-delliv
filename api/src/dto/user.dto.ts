import { $Enums } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  address: string;
  password: string;
  role: $Enums.Role;
}

export class LoginDto {
  email: string;
  password: string;
}

export class returnDataDto {
  email: string;
  id: string;
  name: string;
  role: $Enums.Role;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
