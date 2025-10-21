<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import TheWelcome from '../components/TheWelcome.vue'
import { ref, type Ref } from 'vue';

const todoStore = useTodoStore();
todoStore.init();

const showDetail: Ref<boolean> = ref(false);
const openDetail = () => {
    showDetail.value = !showDetail.value;
}
</script>

<template>
    <div class="base">
        <div>
            <span>list</span>
            <button v-on:click="openDetail">detail</button>
        </div>
        <div class="container">
            <div v-for="item in todoStore.$state.listCategory" class="category">
                <div>{{ item.name }}</div>
                <div v-for="content in todoStore.$state.currentTodo[item.id]" class="container">
                    <div>
                        <span class="item">{{ (content.doAt.getMonth() + 1) + "/" + content.doAt.getDate()}}</span>
                        
                    </div>
                    <div>
                        <div>
                            <span>{{ content.title }}</span>
                            <button v-on:click="todoStore.deleteTodo(content.id)">delete</button>
                        </div>
                        <div v-show="showDetail">{{ content.detail }}</div>
                    </div>
                </div>
            </div>                 
        </div>
        <div v-for="value in 100"> {{ value }}</div>
    </div>

</template>

<style scoped> 
.base {
    background-color: antiquewhite;
    height: 100%;
}
.container {
    display: flex;
    width: 100%;
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.item {
    margin: 0 4px 0 4px;
}
</style>