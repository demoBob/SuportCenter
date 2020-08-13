<template>
  <div class="login">
   <div class="login-left">
      <img src="../../assets/img/LOGO.png" class="login-logo">
      <div class="login-welcome">Welcome!</div>
      <div class="login-hi">Hi there,you can submit your ticket in just 3 steps</div>
      <div class="login-mian1"></div>
      <div class="login-caseinfo">Enter Case Info.</div>
      <div class="login-br"></div>
      <div class="login-mian2"></div>
      <div class="login-contactinfo">Enter Contact Info.</div>
      <div class="login-br2"></div>
      <div class="login-mian3"></div>
      <div class="login-submit">Submit Ticket</div>
   </div>
   <div class="login-Login">Login</div>
   <div class="login-username">Username</div>
   <input class="login-username-text" type="text" placeholder="Enter Your User Name" onfocus="this.placeholder=''" onblur="this.placeholder='Enter Your User Name'" v-model="username">
   <div class="login-password">Password</div>
   <input class="login-password-text" type="password" placeholder="Enter Your Password" onfocus="this.placeholder=''" onblur="this.placeholder='Enter Your Password'" v-model="userpwd" @keyup.enter="ToMain">
   <div class="login-forgetpassword" @click="forgotpassword">Forgot my password </div>   
   <el-button class="login-loginbutton" @click="ToMain">Login</el-button>

   <Forgotpassword v-if="ForgotpasswordVisible" ref="toForgotpassword"></Forgotpassword>
   <Changepassword v-if="ChangepasswordVisible" ref="toChangepassword"></Changepassword> 
   <!--
     if(this.username === '' || this.userpwd === ''){
        alert('账号或密码不能为空！');
      }else{
            axios.get('http://localhost:65041/Login',{
                                params:{
                                    username:this.username,
                                    userpwd:this.userpwd
                                }
                            })
        .then(Response =>{
          console.log(Response.Data);
          if(Response.data == "true"){
              this.$router.push('/Main') 
          }else{
              alert("登陆失败");
          }
        })
        .catch(error =>{
          console.log(error);    
        })
      }
   -->     
  </div>
</template>

<script>
import mainServices from "@/services/mainServices.js"
import Forgotpassword from '@/components/commom/Forgotpassword'
import Changepassword from '@/components/commom/Changepassword'
import encryption from '@/services/encryption.js'
export default {
  name:"login",
  components:{
    Forgotpassword,
    Changepassword
  },
  data(){

    return{
      username:"",
      userpwd:"",
      Productsdate:[],
      ForgotpasswordVisible: false,
      IsManager:"",
      ContactCompanyName:"",
      ContactEmail:"",
      ContactPerson:"",
      ContactNumber:"",
      ChangepasswordVisible: false,
    }
  },
  methods:{    
    ToMain(){
      if(this.username === '' || this.userpwd === ''){
        //alert('账号或密码不能为空！');
        this.$alert('Please enter Username and Password!', 'Message', {
                                confirmButtonText: 'OK'
                                });
      }else{  
        const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });     
        var username = this.username;
        var password = this.userpwd;
        mainServices.SupportLogin(username,password)
        .then(Response =>{
          console.log(Response.isSuccess)
          if(Response.isSuccess == true){
              this.IsManager = Response.data.IsManager;
              if(Response.data.ContactCompanyName == null){
                this.ContactCompanyName = "";
              }else{
                this.ContactCompanyName = Response.data.ContactCompanyName;
              }

              if(Response.data.ContactEmail == null){
                this.ContactEmail = "";
              }else{
                this.ContactEmail = Response.data.ContactEmail;
              }

              if(Response.data.ContactPerson == null){
                this.ContactPerson = "";
              }else{
                this.ContactPerson = Response.data.ContactPerson;
              }

              if(Response.data.ContactNumber == null){
                this.ContactNumber = "";
              }else{
                this.ContactNumber = Response.data.ContactNumber;
              }              
              sessionStorage.setItem('username',username);
              if(Response.data.IsPasswordChangeRequired == true){
                  loading.close();
                  this.ChangepasswordVisible = true
                  this.$nextTick(() => {
                  this.$refs.toChangepassword.init()
                  })
              }else{
                  loading.close();
                  sessionStorage.setItem('password',encryption.encryptBy(password));
                                sessionStorage.setItem('IsManager',this.IsManager);
                                sessionStorage.setItem("ContactCompanyName",this.ContactCompanyName);
                                sessionStorage.setItem('ContactEmail',this.ContactEmail);
                                sessionStorage.setItem("ContactPerson",this.ContactPerson);
                                sessionStorage.setItem('ContactNumber',this.ContactNumber);
                                sessionStorage.setItem("loginstatus", "true");                        
                              this.$router.push('/Main')              
              }             
            
          }else{
              //alert("登陆失败");
              this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
              loading.close();
          }
        })
        .catch(error =>{
          console.log(error);
          this.$alert('Login failed, please try again', 'Message', {
                                confirmButtonText: 'OK'
                                });
              loading.close();    
        })
      }
      //this.GLOBAL.status = "true"
      //this.$router.push('/Main')                      
    },
    forgotpassword(){
      this.ForgotpasswordVisible = true
            this.$nextTick(() => {
            this.$refs.toForgotpassword.init()
            })
    },
    handleKeyDown (e) {
      let key = null
      if (window.event === undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key === 13) {
        alert(1)
      }
    }
  },
  created:function(){
    //window.addEventListener('keydown', this.handleKeyDown, true)//开启监听键盘按下事件
  } 
}
</script>


<style scoped src="../../components/css/Login.css">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    
</style>