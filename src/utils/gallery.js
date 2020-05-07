import Project from 'src/models/Project';
import storage from 'src/utils/storage';

const projectsDir = 'projects';

export default new (class Gallery {
  saveProject = async (state) => {
    const project = new Project(Date.now(), state, 'Me');
    const projects = await this.getProjects();
    const updatedList = projects.concat(project);
    await storage.setItem(projectsDir, updatedList);
  };

  updateProject = async (id, state) => {
    const projects = await this.getProjects();
    const index = projects.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }
    projects[index].state = state;
    await storage.setItem(projectsDir, projects);
  };

  getProjects = async () => storage.getItem(projectsDir, []);

  remove = async (id) => {
    const projects = await this.getProjects();
    const updatedList = projects.filter((project) => project.id !== id);
    return storage.setItem(projectsDir, updatedList);
  };
})();
