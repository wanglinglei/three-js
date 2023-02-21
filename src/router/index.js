import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home";
import About from "../pages/about";
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

export const Router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
