import axios from "axios";

export const portfolio = {
  get: async () => {
    const res = await axios.get("/api/me/portfolio");
    return res.data;
  },
  updateDraft: async (data) => {
    const res = await axios.put("/api/me/portfolio/draft", data);
    return res.data;
  },
  publish: async (subdomain) => {
    const res = await axios.post(`/api/me/portfolio/publish`, { subdomain });
    return res.data;
  },
};

export const subdomains = {
  isSubdomainAvailable: async (subdomain) => {
    const res = await axios.get(`/api/subdomains/${subdomain}`);
    return res.data;
  },
};
