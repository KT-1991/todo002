<script setup lang="ts">
import ListTodo from '@/components/ListTodo.vue';
import InputForm from '@/components/InputForm.vue';
</script>

<template>
  <main class="base">
    <InputForm/>
    <ListTodo />
  </main>
</template>

<style scoped>

.base {
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>