import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Main from '@/components/page/Main'
import Contents from '@/components/page/Content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path:'/Main',
      component:Main             
    },{
      path:"/Content",
      name:'Content',
      component:Contents
    }
  ],
  mode:'history'
})
