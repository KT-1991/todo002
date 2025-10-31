<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { COLOR_TYPE } from './scripts/const';
import { useColorStore } from './stores/color';

const colorStore = useColorStore();
colorStore.init();

</script>

<template>
  <div class="background">
    <div class="base_top">
      <header class="header_nav">
        <nav>
          <RouterLink to="/">ホーム</RouterLink>
          <!--RouterLink to="/about">About</RouterLink>
          <RouterLink to="/test">Test</RouterLink-->
          <RouterLink to="/list">リスト</RouterLink>
          <RouterLink to="/calendar">カレンダー</RouterLink>
          <RouterLink to="/category">カテゴリー編集</RouterLink>
          <RouterLink to="/log">ログ</RouterLink>
          <RouterLink to="/setting">設定</RouterLink>
        </nav>
      </header>
      <RouterView/>    
    </div>
  </div>

</template>

<style scoped>
.base_top {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header_nav {
  background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.primary));
  * {
    margin: 0 4px;
    color: v-bind(colorStore.getColorBy(COLOR_TYPE.onPrimary));
  } 
}
.background {
  height: 100vh;
  background-color: v-bind(colorStore.getColorBy(COLOR_TYPE.background));
}
</style>
