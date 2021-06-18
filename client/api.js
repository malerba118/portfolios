import axios from 'axios'

export const ingredients = {
    get: async () => {
        const res = await axios.get("/api/ingredients");
        return res.data;  
    }
}

export const blends = {
    create: async (data) => {
        const res = await axios.post("/api/blends", data);
        return res.data;  
    }
}