<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { COLOR_TYPE } from '@/scripts/const';
import { useColorStore } from '@/stores/color';
import { getWorkingDay } from '@/scripts/utils';

const colorStore = useColorStore();
const todoStore = useTodoStore();
todoStore.init();

const getToday = (): string => {
    const today: Date = new Date();
    return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
}

</script>

<template>
    <div class="home_base">
        <div class="home_title">Todo Home</div>
        <div class="home_date">{{ getToday() + "( "+ getWorkingDay(new Date()) + " )" }}</div>
        <div v-for="category in todoStore.listCategory" class="home_category_body">
            <div class="home_category_title">
                <span>{{ category.name }}</span>
                <span>{{ "(" + todoStore.calenderTodo[getToday()]![category.id]?.length + ")" }}</span>
            </div>
            <div v-for="item in todoStore.calenderTodo[getToday()]![category.id]">
                <span class="home_item_title">{{ item.title }}</span>
                <span class="home_item_detail">{{ item.detail }}</span>
            </div>
        </div>        
    </div>

</template>

<style scoped>
.home_base{
    margin: 20px;
    width: 100%;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.background));
}
.home_title{
    font-size: large;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onBackground));
}
.home_date{
    font-size: x-large;
    width: 100%;
    padding: 10px;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimaryHeavy));
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
}
.home_category_body{
    width: 95%;
    margin: 10px 0 ;
    border: 1px solid rgb(120, 120, 120);
    box-shadow: 5px 3px 3px rgb(120, 120, 120);
}
.home_category_title{
    font-size: large;
    padding: 5px;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimary));
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
.home_item_title{
    margin-left: 15px;
    margin-right: 10px;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onBackground));
}
.home_item_detail{
    font-size: small;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onBackground));
}
</style>