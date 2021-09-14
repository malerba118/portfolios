export const templates = {
  venice: {
    label: "Venice",
    img: `/templates/venice.png`,
    defaults: {
      headingFont: "Ubuntu",
      paragraphFont: "Ubuntu",
      palette: "ocean",
    },
  },
  madrid: {
    label: "Madrid",
    img: `/templates/madrid.png`,
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "desert",
    },
  },
  skrol: {
    label: "Skrol",
    img: `/templates/skrol.png`,
    defaults: {
      headingFont: "Montserrat",
      paragraphFont: "Lato",
      palette: "desert",
    },
  },
};

export const templateNames = Object.keys(templates).sort();
