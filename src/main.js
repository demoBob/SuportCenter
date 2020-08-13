// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './components/commom/Global'
import App from './App'
import router from './router'
import './utils/flexible'
import store from './store'
import locale from 'element-ui/lib/locale/lang/en'



Vue.config.productionTip = false
Vue.prototype.GLOBAL = global
Vue.prototype.setCookie = function(c_name,value) {
  var exdate=new Date();
  exdate.setTime(exdate.getTime()+30*60*1000); 
  document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString()
};


Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};

Vue.prototype.deleteCookie=function(c_name) {
  var date=new Date() 
  date.setSeconds(date.getSeconds()-1)
  document.cookie=c_name+ "="+escape("")+"; expires="+date.toGMTString()
};

Vue.use(ElementUI,{locale});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
