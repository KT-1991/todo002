<script setup lang="ts">
import TodoHome from '@/components/TodoHome.vue';
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TodoHome />
  </main>
</template>

<style scoped>
.header {
  width: 100%;
  position: sticky;
  top: 0;
}
</style>
