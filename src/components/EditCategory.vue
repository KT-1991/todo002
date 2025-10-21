<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref, type Ref } from 'vue';

const todoStore = useTodoStore();

const newName: Ref<string> = ref("");

const addCategory = () => {
    todoStore.addCategory(newName.value);
}

</script>

<template>
    <div class="base">
        <div v-for="item in todoStore.listCategory">
            <span>{{ item.name }}</span>
            <span>[非表示]</span>
            <span>[削除]</span>
        </div>
       <input type="text" placeholder="new category" v-model="newName">
       <button v-on:click="addCategory">add</button>
    </div>

</template>

<style scoped>
.base {
    background-color: lightblue;
}
</style>