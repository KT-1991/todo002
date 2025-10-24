<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="background">
    <div class="base">
      <header class="header_nav">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/test">Test</RouterLink>
          <RouterLink to="/list">List</RouterLink>
          <RouterLink to="/calendar">Calendar</RouterLink>
          <RouterLink to="/category">Category</RouterLink>
          <RouterLink to="/log">Log</RouterLink>
        </nav>
      </header>
      <RouterView/>    
    </div>
  </div>

</template>

<style scoped>
.base {
  height: 80vh;
  display: flex;
  flex-direction: column;
}
.header_nav * {
  margin: 4px;
}
.background {
  height: 100vh;
  background-color: lightgrey;
}
</style>
