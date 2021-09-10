import { isDev } from "./runtime";
import qs from "query-string";

export const getSubdomain = (host) => {
  return host.split(".").slice(0, -2).join(".");
};

export const getHostingUrl = ({
  subdomain,
  edit,
  template,
  portfolio,
} = {}) => {
  let query = qs.stringify({
    edit: !!edit ? true : undefined,
    template,
    portfolio,
  });
  if (isDev) {
    if (subdomain) {
      // override query to include subdomain
      query = qs.stringify({
        edit: !!edit ? true : undefined,
        template,
        portfolio,
        subdomain,
      });
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}:${process.env.NEXT_PUBLIC_HOSTING_URL_PORT}?${query}`;
    } else {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}:${process.env.NEXT_PUBLIC_HOSTING_URL_PORT}?${query}`;
    }
  } else {
    if (subdomain) {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${subdomain}.${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}?${query}`;
    } else {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}?${query}`;
    }
  }
};

export const getAppUrl = () => {
  return process.env.NEXT_PUBLIC_EDITOR_URL;
};
