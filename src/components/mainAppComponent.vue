<template>
  <div class="emptySpace">
    <div class="mainWrapper">
      <div class="projectsMainWrapper">
        <div class="titleWrapper">
          <div class="title">Проекты</div>
            <plus-button
            @click="openAddProjectPanel"
            />
        </div>
        <div class="addProjectWrapper" v-if="isAddProjectPanel">
            <addItem
            @closeAddProjectPanel="openAddProjectPanel"
            @saveProjectOrTaskInStore="saveInStore"
            :addProject="true"
            />
        </div>
        <div class="projectsWrapper">
          <div 
          class="projectWrapper"
          :class="{ activeProject :$store.state.activeProject === project.id}"
          v-for="(project) in $store.state.projects"
          :key="project.id"
          >
            <projectItem
            :projectName="project.name" 
            @click="openProject(project.id,project.name)"
            @contextmenu.prevent="openContextmenu($event, project.id)"
            />
            <div 
            class="editDelteWrapper" 
            v-if="project.isOpenContextmenu"
            :style="{left: contextmenuPosition.x + 'px', top: contextmenuPosition.y + 'px'}"
            >
              <editItem
              :projectId="project.id"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="boardMainWrapper">
        <div class="projectName">{{ this.$store.state.activeProjectName }}</div>
        <div class="boardsWrapper">
          <div class="board1Wrapper boardWrapper">
            <boardItem
            :boardName="$store.state.boards[0].name"
            :isAddButton="true"
            :boardId="1"
            />
          </div>
          <div class="board2Wrapper boardWrapper">
            <boardItem
            :boardName="$store.state.boards[1].name"
            :isAddButton="false"
            :boardId="2"
            />
          </div>
          <div class="board3Wrapper boardWrapper">
            <boardItem
            :boardName="$store.state.boards[2].name"
            :isAddButton="false"
            :boardId="3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addItemVue from './addItem.vue'
import boardItemVue from './boardItem.vue'
import editItemVue from './editItem.vue'
import plusButtonVue from './plusButton.vue'
import projectItemVue from './projectItem.vue'
export default {
data () {
  return {
    isAddProjectPanel: false,
    contextmenuPosition: {
      x: 0,
      y: 0
    },
    activeBoard: null,
    

  }
},
methods: {
openAddProjectPanel () {
  this.isAddProjectPanel = !this.isAddProjectPanel
},
saveInStore (inputValue) {
  let id = Date.now ()
  this.$store.state.projects.push({
    id: id,
    name: inputValue
  })
  this.$store.commit('saveInLS')
},
openProject (projectId,projectName) {
  this.$store.state.activeProject = projectId
  this.$store.state.activeProjectName = projectName
  this.$store.commit('saveInLS')

},
openContextmenu ($event, projectId) {
  let projects = this.$store.state.projects
  projects.forEach(element => {
    element.isOpenContextmenu = false
    if(element.id === projectId) {
      element.isOpenContextmenu = true
    } 

  });

  let x = $event.clientX
  let y = $event.clientY

  this.contextmenuPosition.x = x + 3
  this.contextmenuPosition.y = y + 3

},
closeContextmenu () {
    let projects = this.$store.state.projects

    projects.forEach(item => {
      return item.isOpenContextmenu = false
    })
    let tasks = this.$store.state.tasks
    tasks.forEach(item => {
      return item.isOpenContextmenu = false
    })

}



},
mounted () {

  this.$store.commit('uploadLS')

  this.closeContextmenu()

  document.addEventListener('click', this.closeContextmenu)

},


components: {
addItem: addItemVue,
projectItem: projectItemVue,
editItem: editItemVue,
boardItem: boardItemVue,
plusButton: plusButtonVue,
editItem: editItemVue,
}
}
</script>

<style scoped>
.emptySpace {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  overflow: auto;
}
.mainWrapper {
  margin:auto;
  width: 1280px;
  height: 100vh;
  max-height: 720px;
  background-color: #fff;
  display: flex;
}
.projectsMainWrapper {
  width: 314px;
  height: 100%;
  background-color: #FAFBFC;
  border-right: 2px solid #E7E9ED;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.titleWrapper {
  padding-top: 10px;
  padding-right: 10px;
  width: 260px;
  height: 49px;
  box-sizing: border-box;
  font-size: 21px;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #E7E9ED;
  margin-bottom: 25px;
}
.title {
  margin-left: auto;
}
.addProject {
  margin-left: auto;
  font-size: 24px;
  cursor: pointer;
}
.addProjectWrapper {
  width: 260px;
  height: fit-content;
}
.projectsWrapper {
  width: 260px;
  margin: 0 auto;
}
.projectName {
  color: #6B778C;
  font-size: 22px;
  height: 49px;
  margin-left: 25px;
  line-height: 49px;
  margin-bottom: 40px;
}
.boardsWrapper {
  display: flex;
  width: 966px;
  margin-left: 30px;
}
.boardWrapper {
  width: fit-content;
  margin-left: 25px;
}
.activeProject {
  background-color: #6b79a64f;
}
.editDelteWrapper {
  position: absolute;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.253);
}

</style>