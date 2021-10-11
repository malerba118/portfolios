export const templates = {
  venice: {
    label: "Venice",
    img: `/templates/venice.png`,
    defaults: {
      headingFont: "Ubuntu",
      paragraphFont: "Ubuntu",
      palette: "gray",
    },
    palettes: ["desert", "gray"],
    locked: false,
  },
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
    palettes: ["blackRed", "purplePink", "blueGreen"],
    locked: true,
  },
  os: {
    label: "Operating System",
    img: `/templates/os.png`,
    defaults: {
      headingFont: "Ubuntu Mono",
      paragraphFont: "Ubuntu Mono",
      palette: "gray",
    },
    palettes: ["gray", "desert", "pink"],
    locked: true,
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
