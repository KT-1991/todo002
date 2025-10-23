<script setup lang="ts">
import ListTodo from '@/components/ListTodo.vue';
import InputForm from '@/components/InputForm.vue';
</script>

<template>
  <main class="base">
    <InputForm class="header"/>
    <ListTodo />
  </main>
</template>

<style scoped>

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
}
.header {
  width: 100%;
  position: sticky;
  top: 0;
}

@media (min-width: 1024px) {
  .base {
    display: flex;
    width: 100%;
    max-height: 100%;
  }

}

</style>