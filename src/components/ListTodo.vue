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
        <div>test list</div>
        <div class="container" v-on:click="openDetail">
            <div v-for="item in todoStore.$state.listCategory" class="category">
                <div>{{ item.name }}</div>
                <div v-for="content in todoStore.$state.currentTodo[item.id]" class="container">
                    <div>
                        <div class="item">{{ (content.doAt.getMonth() + 1) + "/" + content.doAt.getDate()}}</div>
                    </div>
                    <div>
                        <div>{{ content.title }}</div>
                        <div v-show="showDetail">{{ content.detail }}</div>
                    </div>
                </div>
            </div>                 
        </div>
   
    </div>

</template>

<style scoped> 
.base {
    background-color: antiquewhite;
}
.container {
    display: flex;
}
.category {
    background-color: azure;
    width: calc(100% / v-bind(todoStore.listCategory.length));
}
.item {
    margin: 0 4px 0 4px;
}
</style>