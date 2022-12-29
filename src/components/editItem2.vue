<template>
  <div class="editItemWrapper">
    <div class="delete"
    @click="delteTask"
    >Delete</div>
  </div>
</template>

<script>
export default {
methods: {
  delteTask () {
    let tasks = this.$store.state.tasks

    tasks = tasks.filter(task => {
      return task.id != this.taskId
    })

    this.$store.state.tasks = tasks
    
    this.$store.commit('saveInLS')
  },

},
props: ['taskId']
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