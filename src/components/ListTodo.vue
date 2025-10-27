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
const getMax = (): number => {
    let max = 0;
    todoStore.listCategory.forEach(elem => {
        const listTodo = todoStore.currentTodo[elem.id]
        if(listTodo != null){
            const len:number = listTodo.length;
            if(max < len){
                max = len;
            }            
        }

    })
    return max;
}
const EMPTY: string = "　"
const getContent = (index: number, categoryId: number, itemName: string) => {
    if(index > getMax()){
        return EMPTY;
    }
    const content = todoStore.currentTodo[categoryId]![index-1];
    if(content == null){
        return EMPTY;
    }
    switch(itemName){
        case "date":
            const doAt = content?.doAt;
            if(doAt == null){
                return EMPTY;
            } else{
                return (doAt.getMonth() + 1) + "/" + doAt.getDate();
            }
        case "title":
            return content!.title;
        case "detail": 
            return content!.detail;
        case "delete":
            return content!.id.toString();
    }   
}
const getBackgroundColorClass = (categoryId: number, isHeader: boolean) => {
    for(let i=0; i < todoStore.listCategory.length; i++){
        if(todoStore.listCategory[i]!.id == categoryId){
            if(i % 2 == 0){
                if(isHeader){
                    return "light_head";
                }else{
                    return "light_body";
                }
            }else{
                if(isHeader){
                    return "heavy_head";
                }else{
                    return "heavy_body";
                }
            }
        }
    }
    return "testheavy_head";
}
const isLastRowClass = (categoryId: number, row: number) => {
    if(row >= todoStore.currentTodo[categoryId]!.length){
        return false;
    }
    const prev = todoStore.currentTodo[categoryId]![row - 1]?.doAt;
    const next = todoStore.currentTodo[categoryId]![row]?.doAt;
    if(prev?.getDate() == next?.getDate()){
        return false;
    }else{
        return true;
    }
}
const isHolidayClass = (index: number, categoryId: number) => {
    if(index > getMax()){
        return "";
    }
    const content = todoStore.currentTodo[categoryId]![index-1];
    switch(content?.doAt.getDay()){
        case 0: return "sunday";
        case 6: return "saturday";
        default: return "";
    }
}

</script>

<template>
    <div class="base_list_todo">
        <div class="container">
            <table class="sticky_table" v-for="category in todoStore.listCategory" >
                <thead class="border" v-bind:class="getBackgroundColorClass(category.id, true)">
                    <tr> 
                        <th colspan="3">
                            {{ category.name }}
                        </th>
                    </tr>
                    <tr >
                        <th class="header">
                            <button v-on:click="todoStore.sortByDate(category.id)">sort: date</button>
                        </th>
                        <th>
                            <button v-on:click="todoStore.sortByTitle(category.id)">sort: title</button>
                        </th>  
                        <th></th>                          
                    </tr>         

                </thead>
                <tbody>
                    <tr v-for="i in getMax()" v-bind:class="getBackgroundColorClass(category.id, false)"
                        :class="{border: isLastRowClass(category.id, i)}">
                            <td v-bind:class="isHolidayClass(i, category.id)">{{ getContent(i, category.id, "date") }}</td>
                            <td>
                                <div v-on:click="openDetail">{{getContent(i, category.id, "title")  }}</div>
                                <div v-show="showDetail">{{ getContent(i, category.id, "detail") }}</div>
                            </td>
                            <td>
                                <button v-on:click="todoStore.deleteTodo((getContent(i, category.id, 'delete') as any))"
                                        v-if="getContent(i, category.id, 'delete') != EMPTY">complete !</button>
                            </td>

                    </tr>
                </tbody>
            </table>                 
        </div>
    </div>

</template>

<style scoped> 
.base_list_todo {
    background-color: antiquewhite;
    overflow-y: scroll;
    height: 90vh;
    ç
    border: 1px solid;
}
.container {
    display: flex;
    flex-direction: row;
    overflow-y: scroll;
    min-width: 100%;
    height: 90vh;
    background-color: red;
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.header{
    position: sticky;
    top: 0;
}
.item {
    margin: 0 4px 0 4px;
}
.sticky_table{
    border-collapse: collapse;
    width: 100%;
    thead{
        /* 縦スクロール時に固定する */
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        /* tbody内のセルより手前に表示する */
        z-index: 1;
    }
}
.light_head {
    background-color: lightblue;
}
.heavy_head {
    background-color: lightcyan;
}
.light_body {
    background-color: palegoldenrod;
}
.heavy_body {
    background-color: lightgoldenrodyellow;
}
.border {
    border-bottom: 1px solid;
}
.saturday {
    color: blue;
}
.sunday {
    color: red;
}
</style>