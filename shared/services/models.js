import { types } from "mobx-state-tree";
import { nanoid } from "nanoid";

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

export const Template = types.model("Template", {
  name: types.string,
  version: types.string,
});

export const About = types
  .model("About", {
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    summary: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    images: types.optional(Medias, { items: [] }),
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

export const Contact = types
  .model("Contact", {
    email: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
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
    startDate: types.optional(types.maybeNull(types.Date), null),
    endDate: types.optional(types.maybeNull(types.Date), null),
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
    projects: types.optional(types.array(Project), [{}]),
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
    template: Template,
  })
  .actions((self) => ({}));

export const Portfolio = types
  .model("Portfolio", {
    id: types.string,
    subdomain: types.maybeNull(types.string),
    live: types.boolean,
    draft: PortfolioData,
    published: types.maybeNull(PortfolioData),
  })
  .actions((self) => ({}));
