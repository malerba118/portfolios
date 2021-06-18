import nookies from "nookies";

export const token = (req) => nookies.get({ req }).token
