<script setup lang="ts">
import ListTodo from '@/components/ListTodo.vue';
import InputForm from '@/components/InputForm.vue';
</script>

<template>
  <main class="base">
    <ListTodo />
    <InputForm/>
  </main>
</template>

<style scoped>

@media (min-width: 1024px) {
  .base {
    display: flex;
    width: 100%;
  }
}

</style>