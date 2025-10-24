<script setup lang="ts">
import CalendarTodo from '@/components/CalendarTodo.vue';
import InputForm from '@/components/InputForm.vue';
</script>

<template>
  <main class="base">
    <InputForm/>
    <CalendarTodo/>
  </main>
</template>

<style scoped>
.base {
  max-height: 100%;
}
</style>