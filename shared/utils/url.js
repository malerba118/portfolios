import { isDev } from "./runtime";

export const getSubdomain = (host) => {
  return host.split(".").slice(0, -2).join(".");
};

export const getHostingUrl = ({ subdomain, edit = false } = {}) => {
  if (isDev) {
    if (subdomain) {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}:${process.env.NEXT_PUBLIC_HOSTING_URL_PORT}?subdomain=${subdomain}&edit=${edit}`;
    } else {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}:${process.env.NEXT_PUBLIC_HOSTING_URL_PORT}?edit=${edit}`;
    }
  } else {
    if (subdomain) {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${subdomain}.${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}?edit=${edit}`;
    } else {
      return `${process.env.NEXT_PUBLIC_HOSTING_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTING_URL_HOST}?edit=${edit}`;
    }
  }
};
