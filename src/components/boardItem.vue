<template>
  <div class="boardMainWrapper">
    <div class="boardNameWrapper">
        <div class="boardName">
            {{boardName}}
        </div>
        <div class="addButton" 
        v-if="isAddButton"
        >
        <plus-button @click="openAddProjectPanel"/>
        </div>
    </div>
    <div 
    class="addItemWrapper"
    v-if="isAddButton && isAddProjectPanel"
    >
        <add-item
        @closeAddProjectPanel="openAddProjectPanel"
        @saveProjectOrTaskInStore="saveInStore"
        />
    </div>
    <div class="tasksWrapper"
    @drop="dropedTask(boardId)"
    @dragover.prevent
    @dragenter.prevent
    droppable="true"
    >
        <div 
        class="taskWrappr"
        v-for="(task) in $store.state.tasks"
        :key="task.id"
        @dragstart="dragTask(task.id)"
        draggable="true"
        >
            <task-item
            v-if="filterProjectTasks(task.projectId) && task.boardId === boardId"
            @contextmenu.prevent="openContextmenu($event, task.id)"
            :task="task"
            :taskId="task.id"
            />

            <div 
            v-if="task.isOpenContextmenu && task.boardId === boardId"
            class="editDelteWrapper" 
            :style="{left: contextmenuPosition.x + 'px', top: contextmenuPosition.y + 'px'}"
            > 
              <edit-item2
              :taskId="task.id"
              />
            </div>  
        </div>
    </div>
  </div>
</template>

<script>
import addItemVue from './addItem.vue'
import editItem2Vue from './editItem2.vue'
import plusButtonVue from './plusButton.vue'
import taskItemVue from './taskItem.vue'
export default {
data () {
  return {
    isAddProjectPanel: false,
    onlyOneProjectFiltredTasks: [],
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
  this.$store.state.tasks.push({
    id: id,
    title: inputValue,
    boardId: 1,
    position: 1,
    projectId: this.$store.state.activeProject,
  })
  this.$store.commit('saveInLS')
},
filterProjectTasks (projectId) {

    if(projectId === this.$store.state.activeProject) {
      return true
    } else {
      return false
    }
},
openContextmenu ($event, taskId) {

  let tasks = this.$store.state.tasks
  tasks.forEach(element => {
    element.isOpenContextmenu = false
    if(element.id === taskId) {
      element.isOpenContextmenu = true
    } 

  });

  let x = $event.clientX
  let y = $event.clientY

  this.contextmenuPosition.x = x + 3
  this.contextmenuPosition.y = y + 3

},
dragTask (taskId) {
  this.$store.state.dragStartTaskId = taskId
},
dropedTask (boardId) {

  let tasks = this.$store.state.tasks
  tasks.forEach(task => {
    if(task.id === this.$store.state.dragStartTaskId) {
      task.boardId = boardId
      this.$store.commit('saveInLS')
    }
  })
}



},
mounted () {
  
},
components: {
    addItem: addItemVue,
    taskItem: taskItemVue,
    plusButton: plusButtonVue,
    editItem2: editItem2Vue
},
props: ['boardName', 'isAddButton', 'boardId']
}
</script>

<style scoped>
.boardMainWrapper {
    width: 275px;
    min-height: 418px;
    max-height: 600px;
    overflow-Y: auto;
    box-sizing: border-box;
    background-color: #F4F5F7;
}
.boardNameWrapper {
    display: flex;
    align-items: center;
    height: 46px;
    border-bottom: 1px solid #E1E4E9;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.addButton {
    margin-left: auto;
    margin-right: 20px;
    font-size: 24px;
}
.addItemWrapper {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 10px;

}
.editDelteWrapper {
  position: absolute;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.253);
}
.tasksWrapper {
  min-height: 350px;
  width: 100%;
}
.tasksWrapper {
  width: 250px;
  margin: 0 auto; 
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>