import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from "@/stores"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/subject/index.vue"),
      redirect: '/articeHome',
      children: [
        {
          path: '/articeDetail',
          component: () => import("@/views/articeDeatil/index.vue")
        },
        {
          path: '/articeHome',
          component: () => import("@/views/subject/Component/defaultHome.vue")
        }
      ]
    }, {
      path: '/articeAll',
      component: () => import("@/views/articeAll/index.vue"),
      redirect: '/all',
      children: [
        {
          path: '/all',
          component: () => import("@/views/articeAll/component/articeall.vue")
        }, {
          path: "/recreation",
          component: () => import("@/views/recreation/index.vue")
        }, {
          path: '/msgboard',
          component: () => import("@/views/recreation/messageBoard.vue")
        }, {
          path: '/gy',
          component: () => import("@/views/Asregards/index.vue")
        }
      ]
    }
  ]
})
let arr = ["/msgboard", "/recreation", "/all"]
router.beforeEach((to, from) => {
  console.log(to);
  const countStore = useCounterStore()
  console.log(countStore.lock);
  if (arr.includes(to.fullPath)) {
    // console.log("有了");
    countStore.setLock(false);
  } else {
    countStore.setLock(true);
  }
  return true
})

export default router
