<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';


const todoStore = useTodoStore();
const selectedCategory: Ref<string> = ref("");

const showDetail: Ref<boolean> = ref(false);
const openDetail = () => {
    showDetail.value = !showDetail.value;
}

const addTodo = () => {
    todoStore.addTodo();
}

</script>

<template>
    <div class="base">
        <div v-on:click="openDetail">add</div>
        <div v-show="showDetail">
            <select v-model="selectedCategory">
                <option disabled value="">カテゴリー</option>
                <option v-for="item in todoStore.listCategory" 
                    v-bind:value="item.id" 
                    v-bind:key="item.id">
                {{ item.name }}
                </option>
            </select>
            <br>
            <input type="text" placeholder="title">
            <br>
            <input type="text" placeholder="detail">
            <br>
            <input type="date" placeholder="date">
            <br>
            <button v-on:click="addTodo">add</button>             
        </div>
       
    </div>

</template>

<style scoped>
.base {
    background-color: lightblue;
}
</style>