<template>
  <div class="addItemWrapper">
    <input type="text" class="inputAddItem" v-model="inputValue" placeholder="Введите название">
    <div class="buttonsWrapper">
        <button class="cancel"
        @click="$emit('closeAddProjectPanel')"
        >cancel</button>
        <button class="add"
        @click="addTask"
        >add</button>
    </div>
  </div>
</template>

<script>
export default {
data () {
    return {
        inputValue: '',
    }
},
methods: {
    addTask () {
        if (this.$store.state.activeProject || this.addProject) {
            if (this.inputValue !== '' ) {
                this.$emit('saveProjectOrTaskInStore',this.inputValue)
                this.inputValue = ''
            }
        } else {
            alert('Выберите проект, чтобы добавить задачу!')
        }
        
    }
},
props: ['addProject']
}
</script>

<style scoped>
.addItemWrapper {
    width: 100%;
}
.inputAddItem {
    padding: 5px 10px;
    background-color: #fff;
    margin-bottom: 5px;
    border-radius: 7px;
    border: 1px solid #e6e6e6;
    width: 100%;
    box-sizing:border-box;
    outline: none;
}
.buttonsWrapper {
    display: flex;
    justify-content: end;
    padding-bottom:10px;
}
.cancel,.add {
    padding: 5px 10px;
    margin-right: 10px;
    background-color:  #E7E9ED;
    border: none;
    border-radius: 6px;
}
.cancel:hover, .add:hover {
    background-color:#c5c8ce;
    
}
.add {
    margin-right: 0px;
}
</style>