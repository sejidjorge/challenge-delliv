import { $Enums } from '@prisma/client';

export class OrderReturnDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: $Enums.Status;
  user: {
    name: string;
    address: string;
    email: string;
  };
}
