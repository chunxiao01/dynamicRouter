import Vue from "vue"
import VueRouter from "vue-router"

import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  },
  {
    path: "/system",
    name: "system",
    component: () => import("@/views/sys/System.vue"),
    children: []
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem("user")
  if (to.name !== "login" && user) {
    //已经登录成功
    let dynamicmenuList = store.state.dynamicMenuList
    if (dynamicmenuList.length === 0) {
      //动态路由刷新消失
      let menuList = sessionStorage.getItem("menuList")
      menuList = JSON.parse(menuList)
      store.dispatch("actionAddMenu", menuList)
      menuList = menuList.map((item) => {
        return {
          ...item,
          component: () => import(`@/${item.componentUrl}`)
        }
      })
      console.log("menuList,", menuList)
      menuList.forEach((item) => {
        router.addRoute("system", item)
      })
      router.addRoute({
        path: "*",
        name: "err404",
        component: () => import("@/views/Err404.vue")
      })
      console.log("from,", from)
      console.log("to,", to)
      next({ ...to, replace: true })
    } else {
      ////动态路由存在
      next()
    }
  } else {
    console.log("from,", from)
    console.log("to,", to)
    if (to.name !== "login" && !user) next({ name: "login" })
    else next()
  }
})

export default router
