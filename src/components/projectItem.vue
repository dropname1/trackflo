<template>
  <div class="projectItemWrapper">
    <img class="folderIcon" :src='imgUrl' alt="">
    <div class="projectName">{{projectName}}</div>
  </div>
</template>

<script>
export default {
data () {
  return {
    imgUrl: new URL('../assets/folder 17.svg', import.meta.url).href
  }
},
props: ['projectName']
}
</script>

<style>
.projectItemWrapper {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
}
.folderIcon {
    margin-right: 20px;
}
</style>