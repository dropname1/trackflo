import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      boards: [
        { id: 1, name: "ЗАДАЧИ" },
        { id: 2, name: "В РАБОТЕ" },
        { id: 3, name: "ГОТОВО" },
      ],
      projects: [{ id: 1, name: "Нарисовать домик", isOpenContextmenu: false }],
      tasks: [
        {
          id: 1,
          title: "Определиться со стилем картинки",
          boardId: 2,
          position: 2,
          projectId: 1,
          isOpenContextmenu: false,
        },
        {
          id: 2,
          title: "Сделать раскадровку картинки",
          boardId: 1,
          position: 1,
          projectId: 1,
          isOpenContextmenu: false,
        },
        {
          id: 3,
          title: "Нарисовать картинку по плану",
          boardId: 1,
          position: 1,
          projectId: 1,
          isOpenContextmenu: false,
        },
      ],
      activeProject: null,
      dragStartTaskId: null,
      activeProjectName: "",
    };
  },
  mutations: {
    saveInLS(state) {
      let projects = state.projects
      let tasks = state.tasks
      let activeProject = state.activeProject
      let activeProjectName = state.activeProjectName


      localStorage.setItem("projects", JSON.stringify(projects));
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem('activeProject',JSON.stringify(activeProject))
      localStorage.setItem('activeProjectName',JSON.stringify(activeProjectName))
    },
    uploadLS (state) {
      let projects = JSON.parse(localStorage.getItem("projects"))
      let tasks = JSON.parse(localStorage.getItem("tasks"))
      let activeProject = JSON.parse(localStorage.getItem("activeProject"))
      let activeProjectName = JSON.parse(localStorage.getItem("activeProjectName"))
      
      if (projects) {
        state.projects = projects;
      }
      if (tasks) {
        state.tasks = tasks;
      }
      if(activeProject) {
        state.activeProject = activeProject
      }
      if(activeProjectName) {
        state.activeProjectName = activeProjectName
      }
      
    }
  },
});

export default store