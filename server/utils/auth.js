import nookies from "nookies";

export const getLoginRedirect = (ctx) => {
    const cookies = nookies.get(ctx);
    if (!cookies.token) {
        return  {
            permanent: false,
            destination: `/login?from=${ctx.resolvedUrl}`,
        }
    }
}