import axios from "axios";

export const user = {
  me: async () => {
    const res = await axios.get("/api/me");
    return res.data;
  },
};

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
    const res = await axios.get(
      `/api/subdomains/${encodeURIComponent(subdomain)}`
    );
    return res.data;
  },
};

export const account = {
  createCheckoutSession: async () => {
    const res = await axios.post("/api/create-checkout-session");
    return res.data;
  },
  createPortalLink: async () => {
    const res = await axios.post("/api/create-portal-link");
    return res.data;
  },
};
