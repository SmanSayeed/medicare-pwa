import { authApi } from "@/redux/api/authApi"; // Update the path

export const authService = {
  registerUser: async (userData) => {
    try {
      const response = await authApi.endpoints.registerUser.initiate(userData);
      return authApi.endpoints.registerUser.unwrap(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await authApi.endpoints.loginUser.initiate(credentials);
      return authApi.endpoints.loginUser.unwrap(response);
    } catch (error) {
      throw new Error(error);
    }
  },
};