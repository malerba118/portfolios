import { types } from "mobx-state-tree";

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
