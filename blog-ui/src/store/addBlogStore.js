import { API_BASE_URL } from "../config";
import axiosInstance from "./axiosConfig"
import { toast } from "react-toastify";

export const useAddBlogStore = (set) => ({
  isLoadingAddBlog: false,
  errorAddBlog: null,
  addBlog: async (title, body) => {
    try {
      set({ isLoadingAddBlog: true, errorAddBlog: null });
      const response = await axiosInstance.post(`${API_BASE_URL}/admin/blogs/add`, {
        title,
        body,
      });
      if (response.status === 200) {
        toast.success("Blog added successfully");
        set({ isLoadingAddBlog: false });
      } else {
        throw new Error("Failed to add the blog");
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to add the blog");
      set({ isLoadingAddBlog: false, errorAddBlog: error.message });
    }
  },
});
