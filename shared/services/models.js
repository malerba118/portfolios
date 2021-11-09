import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import _ from "lodash";
import { templates } from "shared/utils/data";

const hideable = (model) =>
  types.optional(
    types
      .model(model.name, {
        hidden: types.optional(types.boolean, false),
        value: model,
      })
      .actions((self) => ({
        set: (patch) => {
          Object.entries(patch).forEach(([key, val]) => {
            if (val !== undefined) {
              self[key] = val;
            }
          });
        },
      })),
    {}
  );

// All percentages
export const Crop = types.model("Crop", {
  unit: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
});

export const Media = types
  .model("Media", {
    id: types.string,
    type: types.maybeNull(types.string),
    name: types.maybeNull(types.string),
    rawUrl: types.maybeNull(types.string),
    processedUrl: types.maybeNull(types.string),
    crop: types.maybeNull(Crop),
    zoom: types.maybeNull(types.number),
    width: types.maybeNull(types.number),
    height: types.maybeNull(types.number),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }))
  .views((self) => ({
    get aspect() {
      if (self.width == null || self.height == null) {
        return 16 / 9;
      }
      return self.width / self.height;
    },
  }));

export const Medias = types
  .model("Medias", {
    items: types.array(Media),
  })
  .actions((self) => ({
    add: (media) => {
      if (Array.isArray(media)) {
        self.items.push(...media);
      } else {
        self.items.push(media);
      }
    },
    remove: (id) => {
      const index = self.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        self.items.splice(index, 1);
      }
    },
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

const templateModels = {
  os: types
    .model("OsSettings", {
      headingFont: types.optional(
        types.string,
        templates.os.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.os.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.os.defaults.palette),
      wallpaper: types.optional(Medias, templates.os.defaults.wallpaper),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
  madrid: types
    .model("MadridSettings", {
      headingFont: types.optional(
        types.string,
        templates.madrid.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.madrid.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.madrid.defaults.palette),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
  skrol: types
    .model("SkrolSettings", {
      headingFont: types.optional(
        types.string,
        templates.skrol.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.skrol.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.skrol.defaults.palette),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
  reveal: types
    .model("RevealSettings", {
      headingFont: types.optional(
        types.string,
        templates.reveal.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.reveal.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.reveal.defaults.palette),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
  circles: types
    .model("CirclesSettings", {
      headingFont: types.optional(
        types.string,
        templates.circles.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.circles.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.circles.defaults.palette),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
  gallery: types
    .model("GallerySettings", {
      headingFont: types.optional(
        types.string,
        templates.gallery.defaults.headingFont
      ),
      paragraphFont: types.optional(
        types.string,
        templates.gallery.defaults.paragraphFont
      ),
      palette: types.optional(types.string, templates.gallery.defaults.palette),
    })
    .actions((self) => ({
      set: (patch) => {
        Object.entries(patch).forEach(([key, val]) => {
          if (val !== undefined) {
            self[key] = val;
          }
        });
      },
    })),
};

const TemplateSettingsMap = types
  .model("TemplateSettingsMap", {
    madrid: types.optional(templateModels.madrid, {}),
    skrol: types.optional(templateModels.skrol, {}),
    reveal: types.optional(templateModels.reveal, {}),
    circles: types.optional(templateModels.circles, {}),
    os: types.optional(templateModels.os, {}),
    gallery: types.optional(templateModels.gallery, {}),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

const Resume = types.model("Resume", {
  name: types.string,
  url: types.string,
});

export const About = types
  .model("About", {
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    summary: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    images: types.optional(Medias, { items: [] }),
    resume: types.maybeNull(Resume),
    logo: types.optional(Medias, { items: [] }),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const SocialLink = types
  .model("SocialLink", {
    id: types.string,
    platform: types.maybeNull(types.string),
    url: types.maybeNull(types.string),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const SocialLinks = types
  .model("SocialLinks", {
    items: types.array(SocialLink),
  })
  .actions((self) => ({
    add: (item) => {
      if (Array.isArray(item)) {
        self.items.unshift(...item);
      } else {
        self.items.unshift(item);
      }
    },
    remove: (id) => {
      const index = self.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        self.items.splice(index, 1);
      }
    },
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const Contact = types
  .model("Contact", {
    email: hideable(types.optional(types.string, "")),
    phone: hideable(types.optional(types.string, "")),
    socialLinks: types.optional(SocialLinks, { items: [] }),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const Project = types
  .model("Project", {
    id: types.optional(types.string, () => nanoid()),
    name: types.optional(types.string, ""),
    summary: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    images: types.optional(Medias, { items: [] }),
    startDate: types.union(
      types.optional(types.maybeNull(types.Date), null),
      types.literal("present")
    ),
    endDate: types.union(
      types.optional(types.maybeNull(types.Date), null),
      types.literal("present")
    ),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const Content = types
  .model("Content", {
    about: types.optional(About, {}),
    contact: types.optional(Contact, {}),
    projects: types.optional(types.array(Project), []),
  })
  .actions((self) => ({
    addProject() {
      self.projects.unshift({
        name: undefined,
        summary: undefined,
        description: undefined,
        images: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    },
    removeProject(id) {
      const index = self.projects.findIndex((p) => p.id === id);
      self.projects.splice(index, 1);
    },
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const PortfolioData = types
  .model("PortfolioData", {
    content: types.optional(Content, {}),
    template: types.optional(types.string, "madrid"),
    templateSettingsMap: types.optional(TemplateSettingsMap, {}),
  })
  .actions((self) => ({
    set: (patch) => {
      Object.entries(patch).forEach(([key, val]) => {
        if (val !== undefined) {
          self[key] = val;
        }
      });
    },
  }));

export const Portfolio = types
  .model("Portfolio", {
    id: types.string,
    subdomain: types.maybeNull(types.string),
    draft: PortfolioData,
    draftLastSaved: types.maybeNull(types.string),
    published: types.maybeNull(PortfolioData),
    advertisementsDisabled: types.maybe(types.boolean),
  })
  .actions((self) => ({}));
