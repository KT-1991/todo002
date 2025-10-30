<script setup lang="ts">
import LogTodo from '@/components/LogTodo.vue';
</script>

<template>
  <main>
    <LogTodo/>
  </main>
</template>

<style scoped>

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
}

@media (min-width: 1024px) {
  .base {
    display: flex;
    width: 100%;
    max-height: 100%;
  }

}

</style>