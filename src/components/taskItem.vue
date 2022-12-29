<template>
  <div 
  class="taskItemWrapper" 
  >
  <div class="taskItem">
        {{task.title}}
    </div>
  </div>
</template>

<script>
export default {
props: ['task', 'taskId']
}
</script>

<style scoped>
.taskItemWrapper {
    padding-left: 10px;
    padding-right: 10px;
    width: 250px;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 8px;
}
</style>