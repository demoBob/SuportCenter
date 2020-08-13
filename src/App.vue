<template>
  <div id="app" @mousemove="moveEvent" @click="moveEvent">
    <headview></headview>

    <router-view v-if="isRouterAlive"/>                 
  </div>
</template>

<script>
import headview from '@/components/commom/headview'
import mainServices from "@/services/mainServices.js"
export default {
  name: 'App',
  //刷新路由方法
  provide(){
    return {
      reload:this.reload
    }
  },
  components:{
    headview
  },
  data(){
    return{
      isRouterAlive: true,
      Productsdate:[],
      timmer: null
    }
  },
  methods: {
  moveEvent: function() {
      let path = ['/']
      if(!path.includes(this.$route.path)) {
        clearTimeout(this.timmer)
        this.init()
      }
    },
    init: function() {
      this.timmer = setTimeout(() => {
        this.$alert("Login timeout,Please login again!", 'Message', {
                                confirmButtonText: 'OK',
                                callback: action => {
                                         this.GLOBAL.num = '1'
                                         this.$store.commit('clear')
                                         this.$store.state.Productsdate=[]
                                         sessionStorage.clear()
                                          this.$router.push({
                                            path: '/'
                                          })  
                                        }                                
                                });
      }, 1000*60*30)
    },
   reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }   
 },beforeCreate:function(){
      var loginstatus = sessionStorage.getItem("loginstatus");
      if(loginstatus==null){
        return;
      }
        if(loginstatus != "true"){
            //alert('你还未登陆！');

            this.$alert('Please login in first', 'Message', {
                                confirmButtonText: 'OK',
                                callback: action => {
                                           this.$router.push('/'); 
                                        }                                
                                });
        }else{
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          this.Productsdate = []; 
          mainServices.GetProducts()
            .then(Response =>{
                if(Response.isSuccess == true){
                    for (var i = 0; i < Response.data.length; i++) {//json类似一个数组，所以通过循环输出里面
                         var objproject = {
                            "ProductId" : Response.data[i].ProductId,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                            "ProductVersion" : Response.data[i].ProductVersion,
                            "Image" : "data:image/png;base64,"+ Response.data[i].ProductImage.FileBody
                        }
                    this.Productsdate.push(objproject);
                    }
                    console.log(this.Productsdate)
                    const product = {
                        Productdate : this.Productsdate
                    }
                    this.$store.commit('GetProduct',product)
                    mainServices.GetModules()
                    .then(Response =>{
                      if(Response.isSuccess == true){
                        var Modules = Response.data;
                        console.log(Modules);
                        this.$store.commit('GetModules',Modules)
                        loading.close();
                        this.$router.push("/Main")                                                 
                      }else{
                        this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
                        loading.close();
                      }
                    })
                    .catch(error =>{
                      console.log(error);
                      this.$alert('GetModules failed, please try again', 'Message', {
                                    confirmButtonText: 'OK'
                                });
                      loading.close();
                    })                                         
                }else{
                  this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
                  loading.close();
                }
            })
            .catch(error =>{
               console.log(error);
               this.$alert('GetProduct failed, please try again', 'Message', {
                                    confirmButtonText: 'OK'
                                });
                      loading.close();    
            })           
        }
        },mounted(){ // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据 
        window.onbeforeunload = function (e) { 
                          this.deleteCookie('username');
                          this.deleteCookie('password');
                          this.deleteCookie('IsManager');
                          this.deleteCookie("ContactCompanyName");
                          this.deleteCookie('ContactEmail');
                          this.deleteCookie("ContactPerson");
                          this.deleteCookie('ContactNumber');
                          this.deleteCookie('loginstatus'); 
         } 
        }
 
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
#app {
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.main{
  top: 7.96%;
  position: absolute;
  width: 1920px;
  height: 92.04%;  
}
</style>