import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path:"/login",
    name:'Login',
    component:() => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:'/agregar',
    name:'Agregar',
    component:() => import('../views/Agregar.vue'),
    meta:{ login: true }
  },
  {
    path:'/editar',
    name:'Editar',
    component:() => import('../views/Editar.vue'),
    props: true,
    meta:{ login:true}
  },
  {
    path:'/juguetes',
    name:'Juguetes',
    component:() => import('../views/Juguetes'),
    meta:{ login: true}
  },
  {
    path: "*",
    redirect: "/login",
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some((route) => route.meta.login);

  if (!user && authRequired) {
    next("login");
  } else if (user && !authRequired) {
    next("lista");
  } else {
    next();
  }
});

export default router
