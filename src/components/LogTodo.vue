<script setup lang="ts">
import { useColorStore } from '@/stores/color';
import { useTodoStore } from '@/stores/todo';
import { reactive, ref, Ref } from 'vue';
import { COLOR_TYPE } from '@/scripts/const';

    const colorStore = useColorStore();
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
    const getActionName = (isCompleted: boolean, prevAction: string): string => {
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
    const getActionTitle = (isCompleted: boolean, prevAction: string): string => {
        if(isCompleted){
            if(prevAction == "complete"){
                return "↩︎キャンセル";
            }else{
                return "";
            }            
        }else{
            return "❌削除";
        }
    }
    const executeAction = async (isCompleted: boolean, prevAction: string, id: number) => {
        const actionTitle: string = getActionName(isCompleted, prevAction);
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
            <span>{{ rowOffset.valueOf().toString() + "-" + (rowOffset.valueOf() + LIMIT_ROW).toString() + "件目" }}</span>
            <button v-on:click="moveOffset(false)">{{ "前の" + LIMIT_ROW.toString() + "件" }}</button>
            <button v-on:click="moveOffset(true)">{{ "次の" + LIMIT_ROW.toString() + "件" }}</button>
        </div>
        <table class="logTable">
            <thead class="log_table_title">
                <tr>
                    <th>action</th>
                    <th>category</th>
                    <th>create</th>
                    <th>title</th>
                    <th>detail</th>
                    <th> </th>
                </tr>                
            </thead>
            <tbody class="log_table_content"> 
                <tr v-for="item in log" class="logRow" :class="{grayRow: getActionTitle(item.isCompleted, item.action)==''}">
                    <td>{{ item.action }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>{{ item.created_at.toLocaleDateString() }}</td>
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

.logTable {
    border-collapse: collapse;
    width: 100%;
}
.logRow {
    border: 1px solid #999;
}
.grayRow {
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.gray));
}
.log_table_title{
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primaryHeavy));
}
.log_table_content{
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
}
</style>