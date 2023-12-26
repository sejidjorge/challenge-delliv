export interface RegisterUserTypes {
  name: string;
  email: string;
  address: string;
  password: string;
  role?: string;
}

export interface UpdateUserTypes {
  name: string;
  role: string;
  address: string;
}
export interface UpdateUserPasswordTypes {
  oldPassword: string;
  newPassword: string;
}

export interface LoginUserTypes {
  email: string;
  password: string;
}
