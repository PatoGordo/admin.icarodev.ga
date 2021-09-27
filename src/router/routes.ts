import { RouteRecordRaw, useRouter } from "vue-router";
import Home from "../pages/Home/Index.vue";
import Login from "../pages/Login/Index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
];

export { routes };
