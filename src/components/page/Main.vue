<template>
    <div class="Mains">
        <div class="Main">
        
        <div class="Main-Head">            
            <img class="Main-Head-logo" src="../../assets/img/Main-LOGO.png">
            <div class="Main-Head-name">Cloudnifier</div>
            <div class="Main-Head-welcome">{{this.fullname}}   ({{this.CompanyName}})</div>
        </div>
        <div class="Main-CreateTicket"  @click="ToContent">
            <img class="Main-CreateTicket-img" src="../../assets/img/CreateTicket.png">
            <div class="Main-CreateTicket-name">Create Ticket</div>
        </div>
        <div class="Main-MyTicket" @click="ToContent2">
            <img class="Main-MyTicket-img" src="../../assets/img/MyTicket.png">
            <div class="Main-MyTicket-name">My Tickets</div>
        </div>
        <div class="Main-MyAccount" @click="ToContent3">
            <img class="Main-MyAccount-img" src="../../assets/img/MyAccount.png">
            <div class="Main-MyAccount-name">My Account</div>
        </div>
        <div class="Main-Logout"  @click="ToLogin">
            <img class="Main-Logout-img" src="../../assets/img/Logout.png">
            <div class="Main-Logout-name">Logout</div>
        </div>
        
    </div>
    <el-dialog
        title="Message"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <span>Please login in first</span>
        <span slot="footer" class="dialog-footer">           
            <el-button type="primary" @click="closetologin">OK</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>
<script>
import mainServices from "@/services/mainServices.js"
import LoginVue from './Login.vue'
export default {
    inject:["reload"],
    components:{

  },
  name: 'Main',
  data(){

    return{
        fullname:"",
        CompanyName:"",
        Productsdate:[],
        username:"",
        dialogVisible:false
    }
  },
  methods:{
      handleClose(){
            this.dialogVisible = false
            this.$router.push('/')
        },
        closetologin(){
            this.dialogVisible = false
            this.$router.push('/')
        },
    ToLogin(){
      this.$store.state.Productsdate=[]
                          sessionStorage.removeItem('username');
                          sessionStorage.removeItem('password');
                          sessionStorage.removeItem('IsManager');
                          sessionStorage.removeItem("ContactCompanyName");
                          sessionStorage.removeItem('ContactEmail');
                          sessionStorage.removeItem("ContactPerson");
                          sessionStorage.removeItem('ContactNumber');
                          sessionStorage.removeItem("loginstatus");        
      this.$router.push('/')
      this.reload()
    },
    ToContent(){
        const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });           
            
            this.Productsdate = []
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
                          mainServices.GetModules()
                          .then(Response =>{
                            if(Response.isSuccess == true){
                              var Modules = Response.data;
                              console.log(Modules);
                              const product = {
                                  Productdate : this.Productsdate
                              }
                              this.$store.commit('GetProduct',product)
                              this.$store.commit('GetModules',Modules)
                              loading.close();
                              this.$router.push('/Content')
                              this.GLOBAL.type = "CreateTicket"                       
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
    },
    ToContent2(){
        this.$router.push('/Content')
        this.GLOBAL.type = "Myticket"
    }
    ,
    ToContent3(){
        const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        var username = this.username;
        mainServices.GetAccountDetails(username)
        .then(Response =>{
          console.log(Response.data)
          if(Response.isSuccess == true){
              const Account = {
                FirstName : Response.data.FirstName,
                LastName : Response.data.LastName,
                EmailAddress : Response.data.EmailAddress,
                PreferredContactMethod : Response.data.PreferredContactMethod,
                BusinessPhone : Response.data.BusinessPhone,
                MobilePhone : Response.data.MobilePhone,
                CompanyName : Response.data.CompanyName,
                CompanyAddress : Response.data.CompanyAddress,
                SupportEffectivePeriodFrom : Response.data.SupportEffectivePeriodFrom,
                SupportEffectivePeriodTo : Response.data.SupportEffectivePeriodTo,
                ContractStatus : Response.data.ContractStatus,
                Entitlement : Response.data.Entitlement,
                ConsultingTokenIncluded : Response.data.ConsultingTokenIncluded,
                Remaining : Response.data.Remaining
              }
              this.$store.commit('GetAccount',Account) 
              loading.close();
              this.$router.push('/Content')
              this.GLOBAL.type = "MyAccount"              
          }else{
              this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
              loading.close();                                
          }
        })
        .catch(error =>{
          console.log(error);  
          this.$alert('GetAccount failed, please try again', 'Message', {
                        confirmButtonText: 'OK'
                    });
          loading.close();  
        })
    }
  },beforeCreate:function(){
      
  },mounted(){
      var loginstatus = sessionStorage.getItem("loginstatus");
        if(loginstatus != "true" || loginstatus == ""){
            this.dialogVisible = true
            // this.$alert('Please login in first', 'Message', {
            //                     confirmButtonText: 'OK',
            //                     callback: action => {
            //                                this.$router.push('/'); 
            //                             }                                
            //                     });

        }
  },created(){
      this.fullname = sessionStorage.getItem('ContactPerson');
      this.CompanyName = sessionStorage.getItem('ContactCompanyName');
      this.username = sessionStorage.getItem('username');
  } 
}
</script>
<style  src="../../components/css/Main.css">
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
</style>