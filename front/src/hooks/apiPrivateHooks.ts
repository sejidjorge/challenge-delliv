import { UpdateUserPasswordTypes, UpdateUserTypes } from "@/types/userTypes";
import { AxiosPrivateService } from "@/utils/axios";
import { useAppSelector } from "./reduxHook";

function getToken(): string | null {
  const token = useAppSelector((state) => state.authUser.token);
  return token;
}

export const usePrivateApi = () => ({
  getAllUsers: async () => {
    const response = await AxiosPrivateService(getToken()).get("/users/all");
    return response;
  },
  getUserProfile: async (userId: string) => {
    const response = await AxiosPrivateService(getToken()).get(
      `/users/profile/${userId}`
    );
    return response;
  },
  updateUserProfile: async (body: UpdateUserTypes, userId: string) => {
    const response = await AxiosPrivateService(getToken()).put(
      `/users/profile/${userId}`,
      body
    );
    return response;
  },
  updateUserPass: async (body: UpdateUserPasswordTypes, userId: string) => {
    const response = await AxiosPrivateService(getToken()).put(
      `/users/profile/${userId}/password`,
      body
    );
    return response;
  },
  deleteUserProfile: async (id: string) => {
    const response = await AxiosPrivateService(getToken()).delete(
      `/users/profile/${id}`
    );
    return response;
  },
  newOrder: async (userId: string) => {
    const response = await AxiosPrivateService(getToken()).post("/orders/new", {
      userId,
    });
    return response;
  },
  getAllOrders: async () => {
    const response = await AxiosPrivateService(getToken()).get("/orders/all");
    return response;
  },
  getOrderById: async (id: string) => {
    const response = await AxiosPrivateService(getToken()).get(`/orders/${id}`);
    return response;
  },
  updateOrder: async (status: string, id: string) => {
    const response = await AxiosPrivateService(getToken()).put(
      `/orders/${id}`,
      { status }
    );
    return response;
  },
  getOrderUserById: async (userId: string) => {
    const response = await AxiosPrivateService(getToken()).get(
      `/orders/user/${userId}`
    );
    return response;
  },
  deleteOrder: async (id: string, userId: string) => {
    const response = await AxiosPrivateService(getToken()).delete(
      `/orders/${id}/${userId}`
    );
    return response;
  },
});
