import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Blogs from "../views/Blogs";
import Detail from "../views/Detail";
import Life from "../views/Life";
import MainIndex from "../views/MainIndex";
import Share from "../views/Share";
import BlogReEdit from "../views/Backstage/BlogReEdit";
import BackstageManage from "../views/Backstage/BackstageManage";
import BackstageLogin from "../views/Backstage/BackstageLogin";
import FatherA from "../test/FatherA";
import ArticleDetail from "../views/ArticleDetail";
import ArticleReEdit from "../views/Backstage/ArticleReEdit";
import Register from "../views/Register";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: "MainIndex"}
  }, {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/blog/:blogId',
    name: 'Detail',
    component: Detail
  }, {
    path: '/article/:articleId',
    name: 'ArticleDetail',
    component: ArticleDetail
  }, {
    path: '/main',
    name: 'MainIndex',
    component: MainIndex
  },  {
    path: '/life',
    name: 'Life',
    component: Life
  },  {
    path: '/share',
    name: 'Share',
    component: Share
  },  {
    path: '/blogreedit',
    name: 'BlogReEdit',
    component: BlogReEdit
  },  {
    path: '/articlereedit',
    name: 'ArticleReEdit',
    component: ArticleReEdit

  },  {
    path: '/backstagemanage',
    name: 'BackstageManage',
    component: BackstageManage
  },  {
    path: '/backstagelogin',
    name: 'BackstageLogin',
    component: BackstageLogin
  },  {
    path: '/test/father',
    name: 'FatherA',
    component: FatherA
  }



  /*
 , {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  }, {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  }*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
