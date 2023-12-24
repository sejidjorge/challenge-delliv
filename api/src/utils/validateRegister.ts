import { CreateUserDto } from '../dto/createUser.dto';

export async function validateRegister(createUserDto: CreateUserDto) {
  const requiredFields = ['address', 'name', 'email', 'password'];
  requiredFields.forEach((field) => {
    if (
      createUserDto[field] == null ||
      createUserDto[field] == '' ||
      createUserDto[field] == undefined
    ) {
      throw new Error(`${field} is required`);
    }
  });
}
