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
</script>

<template>
    <div class="base">
        <div>
            <span>list</span>
            <button v-on:click="openDetail">detail</button>
        </div>
        <div class="container">
            <div v-for="item in todoStore.$state.listCategory" class="category">
                <div>{{ item.name }}</div>
                <table>
                    <thead class="tableHeader">
                        <tr>
                            <th>
                                <button v-on:click="todoStore.sortByDate(item.id)">date</button>
                            </th>
                            <th>
                                <button v-on:click="todoStore.sortByTitle(item.id)">title</button>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="content in todoStore.$state.currentTodo[item.id]">
                            <td>{{ (content.doAt.getMonth() + 1) + "/" + content.doAt.getDate()}}</td>
                            <td>
                                <div>{{ content.title }}</div>
                                <div v-show="showDetail">{{ content.detail }}</div>
                            </td>
                            <td>
                                <button v-on:click="todoStore.deleteTodo(content.id)">✔️</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>                 
        </div>
    </div>

</template>

<style scoped> 
.base {
    background-color: antiquewhite;
    max-height: 100%;
    overflow-y: scroll;
}
.container {
    display: flex;
    width: 100%;
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.item {
    margin: 0 4px 0 4px;
}
.tableHeader {
    position: sticky;
}
</style>