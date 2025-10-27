<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { reactive, ref, Ref } from 'vue';

    const todoStore = useTodoStore();

    const log: Array<{action: string, category_id: number, category_name: string , id: number, created_at: Date, title: string, detail: string, isCompleted: boolean}> = reactive([]);

    const LIMIT_ROW: number = 100;
    const rowOffset: Ref<number> = ref(0);
    
    const moveOffset = async (moveNext: boolean) => {
        if(moveNext){
            rowOffset.value += LIMIT_ROW;
        }else{
            if(rowOffset.value >= LIMIT_ROW){
                rowOffset.value -= LIMIT_ROW;
            }else{
                //何もしない
            }
        }
        await initLog();
    }

    const initLog = async () => {
        log.splice(0, log.length);
        await todoStore.initWithCompletedData(LIMIT_ROW ,rowOffset.value);
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
        for(let i=0; i < 3000; i++){
           todoStore.addTodo(1, "test" + i.toString(), "detail" + i.toString(), new Date()); 
        }
        for(let i=0; i < 2970; i++){
            todoStore.deleteTodo(i);
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
    const executeAction = async (isCompleted: boolean, prevAction: string, id: number) => {
        const actionTitle: string = getActionTitle(isCompleted, prevAction);
        switch(actionTitle){
            case "cancel":
                await todoStore.cancelDeleteTodo(id);
                console.log(id);
                await initLog();
                break;
            case "delete": 
                await todoStore.cancelAddTodo(id);
                await initLog();
                break;
        }
    }
</script>

<template>
    <div>
        <div>
            <button v-on:click="todoStore.import">import</button>
            <button v-on:click="todoStore.export">export</button>
            <button v-on:click="generateTestData">gen test data</button>            
        </div>
        <div>
            <button v-on:click="moveOffset(false)">prev</button>
            <button v-on:click="moveOffset(true)">next</button>
        </div>
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
                        <button v-if="getActionTitle(item.isCompleted, item.action)!=''"
                            v-on:click="executeAction(item.isCompleted, item.action, item.id)">
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