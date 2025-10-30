<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import TheWelcome from '../components/TheWelcome.vue'
import { ref, type Ref } from 'vue';
import { useColorStore } from '@/stores/color';
import { BUTTON_TYPE, COLOR_TYPE } from '@/scripts/const';
import ButtonMain from './ButtonMain.vue';
import { getWorkingDay } from '@/scripts/utils';

const colorStore = useColorStore();

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

const isHolidayClass = (date: string) => {
    switch(new Date(date).getDay()){
        case 0: return "sunday";
        case 6: return "saturday";
        default: return "";
    }
}

const showDate = (dateText: string):string => {
    const date = new Date(dateText);
    return (date.getMonth() + 1 ) + "/" + date.getDate() + " (" + getWorkingDay(date) + ")";
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
                    <td v-bind:class="isHolidayClass(date)">{{ showDate(date) }}</td>
                    <td v-for="category in todoStore.listCategory">
                        <div v-for="item in getTodoByCategory(date, category.id)" class="calendar_table_item">
                            <span class="item">{{ item.title}}</span>
                            <ButtonMain :button-type="BUTTON_TYPE.SECONDARY" 
                                        v-on:click="todoStore.deleteTodo(item.id)"
                                        class="calendar_complete_button">✔️</ButtonMain>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped> 
.base_calendar_todo {
    height: 90vh;
    margin: 0 0 0 10px;
    overflow-y: scroll;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimary));
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
.calendar_table {
    width: 100%;
    border-collapse: collapse;
    * th {
        border: 1px solid;
        color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimaryHeavy));
        background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
    }
    * td {
        border: 1px solid v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimaryHeavy));
    }
}
.calendar_table_item{
    display: flex;
    align-items: center; 
    vertical-align: middle;
}
.container {
    display: flex;
    width: 100%;
    
}
.category {
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.category2 {
    width: 100%;
}
.item {
    margin: 0 10px 0 10px;
}
.saturday {
    color: blue;
}
.sunday {
    color: red;
}
.calendar_complete_button{
    width: fit-content;
}
</style>