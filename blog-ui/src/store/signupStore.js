// signupStore.js
import { API_BASE_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

export const useSignupStore = (set) => ({
  isLoadingSignup: false,
  addUser: async (data) => {
    try {
      set({ isLoadingSignup: true });
      const response = await axios.post(
        `${API_BASE_URL}/auth/addNewUser`,
        data
      );
      console.log(response.data);
      toast.success("User added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add user");
    } finally {
      set({ isLoadingSignup: false });
    }
  },
});
