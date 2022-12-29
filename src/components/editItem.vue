<template>
  <div class="editItemWrapper">
    <div class="delete"
    @click="delteProject"
    >Delete</div>
  </div>
</template>

<script>
export default {
methods: {
  delteProject () {
    let projects = this.$store.state.projects

    this.$store.state.projects = projects.filter(project => {
      return project.id != this.projectId
    })

    let tasks = this.$store.state.tasks

    this.$store.state.tasks = tasks.filter(task => {
      return task.projectId != this.projectId
    })

    if (this.$store.state.projects.length < 1) {
      this.$store.state.activeProject = null
      this.$store.state.activeProjectName = null
    }

    this.$store.commit('saveInLS')
  }
},
props: ['projectId']
}
</script>

<style scoped>
.editItemWrapper {
width: 150px;
background-color: #F4F5F7;
cursor: pointer;
}
.delete, .edit {
    border: 2px solid #E6E6E6;
    box-sizing: border-box;
    height: 32px;
    padding-left: 10px;
    line-height: 32px;
}

</style>