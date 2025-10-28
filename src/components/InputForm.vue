<script setup lang="ts">
import { useColorStore } from '@/stores/color';
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';
import { COLOR_TYPE } from '@/scripts/const';

const colorStore = useColorStore();
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
        <div v-on:click="openDetail" class="inputTitle">
            <div class="arrow" :class="{arrow_rotate:showDetail}"> ▼ </div>
            <span>新規作成</span>
        </div> 
        <div v-show="showDetail" class="inputContent">
            <select v-model="selectedCategory">
                <option disabled value="" >カテゴリー</option>
                <option v-for="item in todoStore.listCategory" 
                    v-bind:value="item.id" 
                    v-bind:key="item.id">
                {{ item.name }}
                </option>
            </select>
            <br>
            <input type="text" placeholder="title" v-model="title" v-on:keyup="todoStore.makeSuggestions(title)" class="textArea">
            <br>
            <div v-for="value in todoStore.suggestions">
                <button v-on:click="getSuggestion(value)">{{ value }}</button>
            </div>
            <textarea class="textArea" v-model="detail" placeholder="detail" ></textarea>
            <br>
            <input type="date" placeholder="date" v-model="doAt">
            <br>
            <button v-on:click="addTodo">add</button>             
        </div>            
    </div>

</template>

<style scoped>
.base_input_form {
    width: 100%;
    margin: 10px;
    border: 1px solid black;
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondary));
}
.inputTitle {
    background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.secondaryHeavy));
}
.inputContent {
    padding: 5px;
}
.textArea {
  field-sizing: content;
  min-width: 150px;
  min-height: min-content;
}
.arrow{
    transition: 1s;
    display: inline-block;
    margin: 4px
}
.arrow_rotate{
    transform: rotate(180deg);
}
</style>