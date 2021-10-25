export const initGoodies = () => {
  const syncAppHeight = () => {
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
      window.addEventListener("resize", syncAppHeight);
    }
  };
  syncAppHeight();
};
