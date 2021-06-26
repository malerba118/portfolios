import axios from "axios";

export const portfolio = {
  get: async () => {
    const res = await axios.get("/api/me/portfolio");
    return res.data;
  },
  patch: async (data) => {
    const res = await axios.patch("/api/me/portfolio", data);
    return res.data;
  },
};
