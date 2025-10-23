<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { reactive } from 'vue';

    const todoStore = useTodoStore();

    const log: Array<{action: string, category_id: number, category_name: string , id: number, created_at: Date, title: string, detail: string, isCompleted: boolean}> = reactive([]);

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
                    detail: item.detail,
                    isCompleted: false
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
                    detail: item.detail,
                    isCompleted: true,
                })
                log.push({
                    action: "complete",
                    category_id: category.id,
                    category_name: category.name,
                    id: item.id,
                    created_at: item.completedAt,
                    title: item.title,
                    detail: item.detail,
                    isCompleted: true
                })
            });          
        });
    }
    initLog();

    const generateTestData = async () => {
        for(let i=0; i < 30; i++){
           await todoStore.addTodo(1, "test" + i.toString(), "detail" + i.toString(), new Date()); 
        }
    }
    const getActionTitle = (isCompleted: boolean, prevAction: string): string => {
        if(isCompleted){
            if(prevAction == "complete"){
                return "cancel";
            }else{
                return "";
            }            
        }else{
            return "delete";
        }
    }
</script>

<template>
    <div>
        <button v-on:click="todoStore.import">import</button>
        <button v-on:click="todoStore.export">export</button>
        <button v-on:click="generateTestData">gen test data</button>
        <table>
            <thead>
                <tr>
                    <th>action</th>
                    <th>category</th>
                    <th>create</th>
                    <th>title</th>
                    <th>detail</th>
                    <th> </th>
                </tr>                
            </thead>
            <tbody>
                <tr v-for="item in log">
                    <td>{{ item.action }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.detail }}</td>
                    <td>
                        <button v-if="getActionTitle(item.isCompleted, item.action)!=''">
                            {{ getActionTitle(item.isCompleted, item.action) }}
                        </button>
                    </td>
                </tr>                  
            </tbody>
      
        </table>

    </div>

</template> 

<style scoped>

</style>