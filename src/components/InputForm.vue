<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';


const todoStore = useTodoStore();
const selectedCategory: Ref<string> = ref("");

const showDetail: Ref<boolean> = ref(false);
const openDetail = () => {
    showDetail.value = !showDetail.value;
}

const title: Ref<string> = ref("");
const detail: Ref<string> = ref("");
const doAt: Ref<Date> = ref(new Date());
const addTodo = () => {
    todoStore.addTodo(selectedCategory.value as unknown as number, title.value, detail.value, doAt.value);
}

const getSuggestion = (word: string) => {
    title.value = word;
}

</script>

<template>
    
    <div class="base_input_form">
        <div v-on:click="openDetail">add ▼</div> 
        <div v-show="showDetail">
            <select v-model="selectedCategory">
                <option disabled value="" >カテゴリー</option>
                <option v-for="item in todoStore.listCategory" 
                    v-bind:value="item.id" 
                    v-bind:key="item.id">
                {{ item.name }}
                </option>
            </select>
            <br>
            <input type="text" placeholder="title" v-model="title" v-on:keyup="todoStore.makeSuggestions(title)">
            <br>
            <div v-for="value in todoStore.suggestions">
                <button v-on:click="getSuggestion(value)">{{ value }}</button>
            </div>
            <input type="text" placeholder="detail" v-model="detail">
            <br>
            <input type="date" placeholder="date" v-model="doAt">
            <br>
            <button v-on:click="addTodo">add</button>             
        </div>            
    </div>

</template>

<style scoped>
.base_input_form {
    background-color: lightskyblue;
    width: 100%;
    margin: 0 0 0 10px;
    padding: 5px
}

</style>