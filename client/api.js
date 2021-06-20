import axios from 'axios'

export const portfolio = {
    get: async () => {
        const res = await axios.get("/api/me/portfolio");
        return res.data;  
    }
}
