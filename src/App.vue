<template>
  <div class="page">
    <div class="title-list">
      <div class="title" v-for="(item) in routes" :key="item.title">{{ item.title }}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { routes } from './router/index'
export default {
  name: 'App',
  components: {
  },
  data: () => {
    return {
      routes: routes
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

.page {
  display: flex;
  width: 100%;
  position: relative;

  .title-list {
    width: 10%;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 9999;
    background-color: #fff;

    .title {
      padding: 10px 20px;
      font-weight: 700;
      text-decoration: underline;
      background-color: skyblue;
      border-bottom: 1px solid red;
      cursor: pointer;
    }
  }
}
</style>
