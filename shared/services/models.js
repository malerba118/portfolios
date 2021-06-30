import { types } from "mobx-state-tree";

export const Media = types
  .model("Media", {
    id: types.string,
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
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    title: types.maybe(types.string),
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
    id: types.optional(types.string, () => String(Math.random())),
    name: types.maybe(types.string),
    summary: types.maybe(types.string),
    description: types.maybe(types.string),
    images: Medias,
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
    about: About,
    projects: types.array(Project),
  })
  .actions((self) => ({
    addProject() {
      self.projects.unshift({
        name: "",
        summary: "",
        description: "",
        images: {
          items: [],
        },
      });
    },
    removeProject(id) {
      const index = self.projects.findIndex((p) => p.id === id);
      self.projects.splice(index, 1);
    },
  }));

export const PortfolioData = types
  .model("PortfolioData", {
    content: Content,
    template: Template,
  })
  .actions((self) => ({}));

export const Portfolio = types
  .model("Portfolio", {
    id: types.string,
    subdomain: types.maybe(types.string),
    live: types.boolean,
    draft: PortfolioData,
    published: types.maybeNull(PortfolioData),
  })
  .actions((self) => ({}));

// export const MediaStore = types
//   .model("MediaStore", {
//     images: MediaArray,
//   })
//   .actions((self) => ({
//     addImage: (media) => {
//       self.images.push(media);
//     },
//   }));
