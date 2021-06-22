export const isServer = () => {
  return typeof window === "undefined";
};

export const isBrowser = () => {
  return !isServer();
};

export const isDev = process.env.NEXT_PUBLIC_ENV === "development";
