// loginStore.js

import axios from "axios";
import { API_BASE_URL } from "../config";
import { setToken, removeToken } from "./auth";

export const useLoginStore = (set) => ({
  isLoadingLogin: false,
  loginUser: async (data) => {
    try {
      set({ isLoadingLogin: true });
      const response = await axios.post(
        `${API_BASE_URL}/auth/generateToken`,
        data
      );

      if (response.status === 200) {
        // Handle successful login
        const token = response.data;
        setToken(token);
        return { success: true };
      } else if (response.status === 403) {
        // Handle failed login
        return { success: false };
      } else {
        // Handle other status codes as needed
        throw new Error(`Login failed with status code: ${response.status}`);
      }


  
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoadingLogin: false });
    }
  },

  // Handle logout
  logout: () => {
    removeToken();
  },
});
