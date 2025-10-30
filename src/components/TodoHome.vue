<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';


const todoStore = useTodoStore();
todoStore.init();

const getToday = (): string => {
    const today: Date = new Date();
    return today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
}

</script>

<template>
    <div>Todo Home</div>
    <div>{{ getToday() }}</div>
    <div v-for="category in todoStore.listCategory">
        <div>
            <span>{{ category.name }}</span>
            <span>{{ "(" + todoStore.calenderTodo[getToday()]![category.id]?.length + ")" }}</span>
        </div>
        <div v-for="item in todoStore.calenderTodo[getToday()]![category.id]">
            <div>{{ item.title }}</div>
            <div>{{ item.detail }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>