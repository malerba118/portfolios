import { nanoid } from "nanoid";

export const templates = {
  madrid: {
    label: "Madrid",
    img: `/templates/madrid.png`,
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "desert",
    },
    locked: false,
    palettes: ["desert", "gray"],
  },
  skrol: {
    label: "Skrol",
    img: `/templates/skrol.png`,
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "purplePink",
    },
    palettes: [
      "blackRed",
      "volcanoVolcano",
      "magentaMagenta",
      "purplePink",
      "blueGreen",
      "grayGreen",
      "whiteBlack",
    ],
    locked: true,
  },
  reveal: {
    label: "Reveal",
    img: `/templates/reveal.png`,
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "desert",
    },
    locked: false,
    palettes: ["desert", "gray"],
  },
  circles: {
    label: "Circles",
    img: `/templates/circles.png`,
    defaults: {
      headingFont: "IBM Plex Mono",
      paragraphFont: "IBM Plex Mono",
      palette: "blackRed",
    },
    palettes: [
      "blackRed",
      "volcanoVolcano",
      "magentaMagenta",
      "purplePink",
      "blueGreen",
      "grayGreen",
      "whiteBlack",
    ],
    locked: true,
  },
  os: {
    label: "Operating System",
    img: `/templates/os.png`,
    defaults: {
      headingFont: "Ubuntu Mono",
      paragraphFont: "Ubuntu Mono",
      palette: "gray",
      wallpaper: {
        items: [
          {
            id: nanoid(),
            name: "wallpaper-light.jpg",
            type: "image/jpeg",
            rawUrl: "https://vernos.us/templates/os/wallpaper-light.jpg",
          },
        ],
      },
    },
    palettes: ["gray", "desert", "pink"],
    locked: true,
  },
  gallery: {
    label: "Gallery",
    img: `/templates/gallery.png`,
    defaults: {
      headingFont: "Crimson Text",
      paragraphFont: "EB Garamond",
      palette: "gray",
    },
    palettes: ["gray", "pink", "desert"],
    locked: false,
  },
};

export const templateNames = Object.keys(templates).sort((a, b) => {
  if (templates[a].locked) {
    a = "z_" + a;
  }
  if (templates[b].locked) {
    b = "z_" + b;
  }
  return a < b ? -1 : a > b ? 1 : 0;
});

export const isLocked = (templateName) => {
  return !!templates[templateName]?.locked;
};

export const hasSubscription = (user) => {
  return user && user.subscription?.status === "active";
};

export const isValidSubdomain = (str) => {
  if (str.length === 0) {
    return false;
  }
  if (str.length === 1) {
    return /[abcdefghijklmnopqrstuvwxyz0123456789]/.test(str);
  }
  return /^[abcdefghijklmnopqrstuvwxyz0123456789][abcdefghijklmnopqrstuvwxyz0123456789-]*[abcdefghijklmnopqrstuvwxyz0123456789]$/.test(
    str
  );
};
