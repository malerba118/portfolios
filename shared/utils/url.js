export const getSubdomain = (host) => {
  return host.split(".").slice(0, -2).join(".");
};
