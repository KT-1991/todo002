<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';

const todoStore = useTodoStore();
todoStore.init();

const newName: Ref<string> = ref("");

const addCategory = () => {
    todoStore.addCategory(newName.value);
}
const deleteCategory = (id: number) => {
    todoStore.deleteCategory(id);
    todoStore.initListCategory();
}

</script>

<template>
    <div class="base_edit_category">
        <div class="title_category">
            <input type="text" placeholder="new category" v-model="newName">
            <button v-on:click="addCategory">add</button>
        </div> 
        <div class="table_category">
            <div>category list</div>       
            <table>
                <tr v-for="item in todoStore.listCategory">
                    <td>{{ item.name }}</td>
                    <td>[非表示]</td>
                    <td>
                        <button v-on:click="deleteCategory(item.id)">delete</button>
                    </td>
                </tr>
            </table>            
        </div>
    </div>

</template>

<style scoped>
.base_edit_category {
    margin: 10px;
}
.title_category {
    background-color: lightskyblue;
    padding: 5px;
    margin: 0 0 10px 0;
    border: 1px solid;
}
.table_category {
    background-color: lightcyan;
    border: 1px solid;
    padding: 5px;
}
</style>