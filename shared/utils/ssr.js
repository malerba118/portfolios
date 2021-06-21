export const isServer = () => {
  return typeof window === "undefined";
};

export const isBrowser = () => {
  return !isServer();
};
