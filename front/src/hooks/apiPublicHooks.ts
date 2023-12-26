import { LoginUserTypes, RegisterUserTypes } from "@/types/userTypes";
import { AxiosPublicService } from "@/utils/axios";

export const usePublicApi = () => ({
  registerConection: async (body: RegisterUserTypes) => {
    const response = await AxiosPublicService.post("/users/register", body);
    return response;
  },
  loginConection: async (body: LoginUserTypes) => {
    const response = await AxiosPublicService.post("/users/login", body);
    return response;
  },
});
