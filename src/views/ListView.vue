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
  max-height: 100%;
}

@media (min-width: 1024px) {
  .base {
    width: 100%;
    max-height: 100%;
  }

}

</style>