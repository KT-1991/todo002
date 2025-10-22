<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { reactive } from 'vue';

    const todoStore = useTodoStore();

    const log: Array<{action: string, category_id: number, category_name: string , id: number, created_at: Date, title: string, detail: string}> = reactive([]);

    const initLog = async () => {
        await todoStore.init()
        todoStore.listCategory.forEach(category => {
            todoStore.currentTodo[category.id]!.forEach(item => {
                log.push({
                    action: "new",
                    category_id: category.id,
                    category_name: category.name,
                    id: item.id,
                    created_at: item.createAt,
                    title: item.title,
                    detail: item.detail
                })
            }); 
            todoStore.completedTodo[category.id]!.forEach(item => {
                log.push({
                    action: "new",
                    category_id: category.id,
                    category_name: category.name,
                    id: item.id,
                    created_at: item.createAt,
                    title: item.title,
                    detail: item.detail
                })
                log.push({
                    action: "complete",
                    category_id: category.id,
                    category_name: category.name,
                    id: item.id,
                    created_at: item.completedAt,
                    title: item.title,
                    detail: item.detail
                })
            });          
        });
    }
    initLog();

</script>

<template>
    <div>
        <button v-on:click="todoStore.import">import</button>
        <button v-on:click="todoStore.export">export</button>
        <div v-for="item in log">
            <span>{{ item.action }}</span>
            <span>{{ item.category_name }}</span>
            <span>{{ item.created_at }}</span>
            <span>{{ item.title }}</span>
            <span>{{ item.detail }}</span>
        </div>
    </div>

</template> 

<style scoped>

</style>