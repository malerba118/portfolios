export const isServer = () => {
  return typeof window === "undefined";
};

export const isBrowser = () => {
  return !isServer();
};

export const isLocal = process.env.NEXT_PUBLIC_IS_LOCAL === "true";
