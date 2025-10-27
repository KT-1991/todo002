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
    <div class="base_calendar_todo">
        <table class="calendar_table">
            <thead>
                <tr>
                    <th>date</th>
                    <th v-for="category in todoStore.listCategory">{{ category.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="date in todoStore.dateSpan">
                    <td>{{ date }}</td>
                    <td v-for="category in todoStore.listCategory">
                        <div v-for="item in getTodoByCategory(date, category.id)" >
                            <span class="item">{{ item.title}}</span>
                            <button v-on:click="todoStore.deleteTodo(item.id)">complete !</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped> 
.base_calendar_todo {
    background-color: antiquewhite;
    height: 90vh;
    margin: 0 0 0 10px;
    overflow-y: scroll;
}
.calendar_table {
    width: 100%;
    border-collapse: collapse;
    * th {
        border: 1px solid;
    }
    * td {
        border: 1px solid;
    }
}
.container {
    display: flex;
    width: 100%;
    
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.category2 {
    width: 100%;
}
.item {
    margin: 10px;
}
</style>