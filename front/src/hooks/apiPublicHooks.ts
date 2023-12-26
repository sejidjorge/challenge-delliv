import { LoginUserTypes, RegisterUserTypes } from "@/types/userTypes";
import { AxiosPublicService } from "@/utils/axios";

export const usePublicApi = () => ({
  register: async (body: RegisterUserTypes) => {
    const response = await AxiosPublicService.post("/users/register", body);
    return response;
  },
  login: async (body: LoginUserTypes) => {
    const response = await AxiosPublicService.post("/users/login", body);
    return response;
  },
});
