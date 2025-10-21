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
const getTodoByCategory = (date: string, idCategory: number): {id: number, 
                                              createAt: Date,
                                              doAt: Date, 
                                              title: string, 
                                              detail: string}[] => {
    const dic = todoStore.calenderTodo[date]
    if(dic == null){
        return [];
    }else{
        const arr = dic[idCategory];
        if(arr == null || arr.length == 0){
            //return [{id: "0" ,title: "none", createAt: new Date(), doAt: new Date(), detail: ""}];
            return [];
        }else{
            return arr;
        }
    }
}

</script>

<template>
    <div class="base">
        <div>test list</div>
        <div class="category2 container">
            <div class="container">{{ "" }}</div>
            <div v-for="category in todoStore.listCategory" class="container">
                <div>{{ category.name}}</div>
            </div>            
        </div>

            <div v-for="date in todoStore.dateSpan" class="category2 container">
                <div class="container">{{ date }}</div>
                <div v-for="category in todoStore.listCategory" class="category2">
                    <div v-for="item in getTodoByCategory(date, category.id)" >
                        <div>
                            <span>{{ item.title}}</span>
                            <button v-on:click="todoStore.deleteTodo(item.id)">delete</button>
                        </div>
                    </div>
                </div>
            </div>                 
    </div>

</template>

<style scoped> 
.base {
    background-color: antiquewhite;
}
.container {
    display: flex;
    width: 100%;
    border: 1px solid;
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.category2 {
    width: 100%;
}
.item {
    margin: 0 4px 0 4px;
}
</style>