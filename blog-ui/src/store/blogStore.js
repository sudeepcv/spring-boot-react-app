// // blogStore.js
// import { API_BASE_URL } from "../config";
// import axiosInstance from "./axiosConfig";

// export const useBlogStore = (set) => ({
//   blogs: [],
//   currentPage: 1,
//   totalPages: 1,
//   setPage: (page) => set({ currentPage: page }),
//   setBlogs: (data) =>
//     set({
//       blogs: data.content,
//       currentPage: data.number + 1,
//       totalPages: data.totalPages,
//     }),
//   fetchBlogs: async (page) => {
//     try {
//       const response = await axiosInstance.get(`${API_BASE_URL}/blogs/list`, {
//         params: {
//           page,
//           size: 5,
//         },
//       });
//       if (response.status !== 200) {
//         throw new Error("Failed to fetch blogs");
//       }
//       const data = response.data;
//       console.log("store data:", data);
//       set({ blogs: data.content, totalPages: data.totalPages });
//     } catch (error) {
//       console.error(error);
//     }
//   },
// });

// blogStore.js
import { API_BASE_URL } from "../config";
import axiosInstance from "./axiosConfig";

export const useBlogStore = (set) => ({
  blogs: [],
  currentPage: 1,
  totalPages: 1,
  setPage: (page) => set({ currentPage: page }),
  setBlogs: (data) =>
    set({
      blogs: data.content,
      currentPage: data.number + 1,
      totalPages: data.totalPages,
    }),
  fetchBlogs: async (page) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/blogs/list`, {
        params: {
          page,
          size: 5,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch blogs");
      }

      const data = response.data;
      set({ blogs: data.content, totalPages: data.totalPages });
    } catch (error) {
      console.error(error);
    }
  },
});

