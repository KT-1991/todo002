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
    <div class="base">
        <table>
            <tr v-for="item in todoStore.listCategory">
                <td>{{ item.name }}</td>
                <td>[非表示]</td>
                <td>
                    <button v-on:click="deleteCategory(item.id)">delete</button>
                </td>
            </tr>
        </table>
        <div>
            <input type="text" placeholder="new category" v-model="newName">
            <button v-on:click="addCategory">add</button>
        </div>
       
    </div>

</template>

<style scoped>
.base {
    background-color: lightblue;
}
</style>