<template>
    <div class="mains">
        <div class="Alex">{{this.fullname}} ({{this.CompanyName}})</div>
        <div class="Contents">
            <div class="Content-tab">
                <div v-if="type == 'CreateTicket'">
                    <div class="Content-pane1checked">
                        <img src="../../assets/img/CreateTicketcheck.png" class="Content-pane1-img">
                        <div class="Content-pane1-nameschecked">Create Ticket</div>
                    </div>
                </div>
                <div v-else>
                    <div class="Content-pane1" @click="ToCreateTicket">
                        <img src="../../assets/img/Createticketdefault.png" class="Content-pane1-img">
                        <div class="Content-pane1-names">Create Ticket</div>
                    </div>
                </div>                
                <div v-if="type == 'Myticket'">
                        <div class="Content-pane2checked">
                            <img src="../../assets/img/MyTicket.png" class="Content-pane2-img">
                            <div class="Content-pane2-nameschecked">My Tickets</div>
                        </div>
                </div>
                <div v-else>
                        <div class="Content-pane2" @click="ToMyticket">
                            <img src="../../assets/img/Myticketdefault.png" class="Content-pane2-img">
                            <div class="Content-pane2-names">My Tickets</div>
                        </div>
                </div>
                              
                
                <div v-if="type == 'MyAccount'">
                        <div class="Content-pane3checked">
                            <img src="../../assets/img/MyAccount.png" class="Content-pane3-img">
                            <div class="Content-pane3-nameschecked">My Account</div>
                        </div>
                </div>
                <div v-else>
                        <div class="Content-pane3" @click="ToMyAccount">
                            <img src="../../assets/img/MyAccountdefault.png" class="Content-pane3-img">
                            <div class="Content-pane3-names">My Account</div>
                        </div>
                </div>               
                 
                <div class="Content-pane4" @click="ToLogin">
                    <img src="../../assets/img/Logoutdefault.png" class="Content-pane4-img">
                    <div class="Content-pane4-names">Logout</div>
                </div>
            </div>
            <div class="Content-content">                               
                <div v-if="type == 'CreateTicket'">
                    <div v-if="num == '1'">
                        <ChooseSolution></ChooseSolution>
                    </div>
                    <div v-else-if="num == '2'">
                        <Caseinfo></Caseinfo>
                    </div>
                    <div v-else-if="num == '3'">
                        <ContactInfo></ContactInfo>
                    </div>
                    <div v-else-if="num == '4'">
                        <Submit></Submit>
                    </div>                    
                </div>                
                <div v-else-if="type == 'Myticket'">
                    <Myticket></Myticket>
                </div>
                <div v-else-if="type == 'MyAccount'">
                    <MyAcount></MyAcount>
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
    </div>       
</template>
<script>
import ChooseSolution from '@/components/commom/ChooseSolution'
import Caseinfo from '@/components/commom/Caseinfo'
import ContactInfo from '@/components/commom/ContactInfo'
import Submit from '@/components/commom/Submit'
import MyAcount from '@/components/commom/MyAcount'
import Myticket from '@/components/commom/Myticket'
import mainServices from "@/services/mainServices.js"

export default {
    name:'content',
    components:{
        ChooseSolution,
        Caseinfo,
        ContactInfo,
        Submit,
        MyAcount,
        Myticket
    },
    data(){
        return{
            type:this.GLOBAL.type,
            num: this.GLOBAL.num,
            Productsdate:[],
            fullname:"",
            CompanyName:"",
            username:"" ,
            dialogVisible:false         
        }
    },methods:{
        handleClose(){
            this.dialogVisible = false
            this.$router.push('/')
        },
        closetologin(){
            this.dialogVisible = false
            this.$router.push('/')
        },
        beforeunloadFn(e) {
            alert("页面刷新");
            console.log("loading");
            // ...
        },
        ToCreateTicket(){  
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
                              this.type = "CreateTicket"
                              loading.close();                       
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
        },ToMyticket(){           
            this.type = "Myticket" 

        },ToMyAccount(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });            
            this.type = "MyAccount"
            var username = this.username;
        mainServices.GetAccountDetails(username)
        .then(Response =>{          
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
            
        },ToLogin(){
            this.GLOBAL.num = '1'
            this.$store.commit('clear')
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
        }
    },beforeCreate:function(){
        
    },mounted(){
        var loginstatus = sessionStorage.getItem("loginstatus");
        if(loginstatus != "true" || loginstatus == ""){
            //alert('你还未登陆！');
            // this.$alert('Please login in first', 'Message', {
            //                     confirmButtonText: 'OK',
            //                     callback: action => {                                        
            //                                this.$router.push('/'); 
            //                             }                                
            //                     });
            this.dialogVisible = true
        }
    },created(){
       this.fullname = sessionStorage.getItem('ContactPerson');
       this.CompanyName = sessionStorage.getItem('ContactCompanyName');
       this.username = sessionStorage.getItem('username');
        
    },destroyed() {
        window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    } 
}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);   
    .Alex{
        position: absolute;
        top: 100px;
        left: 18.75%;
        width:1000px;
        height:28px;
        font-size:20px;
        font-weight:400;
        color:rgba(35,73,199,1);
        line-height:28px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Contents{
        position: absolute;
        top: 146px;
        left: 18.75%;
        width:1200px;
        height:880px;
        background:rgba(255,255,255,1);
        border-radius:8px;
    }    
    
    .Content-tab{
        width:1200px;
        height:120px; 
        position: absolute;      
    }
    .Content-content{
        position: absolute;
        top: 120px;
        width:1200px;
        height: 760px;
    }

    .Content-pane1{
        position: absolute;
        width:299px;
        height:119px;
        background:rgba(249,249,249,1);
        border-right: 1px solid #DDDDDD;
        border-bottom:  1px solid #DDDDDD;
        cursor: pointer;        
    }
    .Content-pane1-img{
        position: absolute;
        top: 34px;
        left: 44.15%;
        width: 36px;
        height: 28px;
    }
    .Content-pane1-names{
        position: absolute;
        top: 70px;
        left: 32.78%;                
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(204,204,204,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane1checked{
        position: absolute;
        width:299px;
        height:119px;
        background:rgba(255,255,255,1);
        border-right: 1px solid #DDDDDD;
        border-bottom: 0px;
        cursor: pointer;        
    }    
    .Content-pane1-nameschecked{
        position: absolute;
        top: 70px;
        left: 32.78%;                
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane2{
        position: absolute;
        left: 25%;
        width:299px;
        height:119px;
        background:rgba(249,249,249,1);
        border-right: 1px solid #DDDDDD;
        border-bottom:  1px solid #DDDDDD;
        cursor: pointer;         
    }
    .Content-pane2-img{
        position: absolute;
        top: 33px;
        left: 44.15%;
        width: 36px;
        height: 28px;
    }
    .Content-pane2-names{
        position: absolute;
        top: 70px;
        left: 37.79%;
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(204,204,204,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane2checked{
        position: absolute;
        left: 25%;
        width:299px;
        height:119px;
        background:rgba(255,255,255,1);
        border-right: 1px solid #DDDDDD;
        border-bottom: 0px;       
    }    
    .Content-pane2-nameschecked{
        position: absolute;
        top: 70px;
        left: 37.79%;
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane3{
        position: absolute;
        left: 50%;
        width:299px;
        height:119px;
        background:rgba(249,249,249,1);
        border-right: 1px solid #DDDDDD;
        border-bottom:  1px solid #DDDDDD;
        cursor: pointer;         
    }
    .Content-pane3-img{
        position: absolute;
        top: 34px;
        left: 44.15%;
        width: 36px;
        height: 28px;
    }
    .Content-pane3-names{
        position: absolute;
        top: 70px;
        left: 34.45%;
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(204,204,204,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane3checked{
        position: absolute;
        left: 50%;
        width:299px;
        height:119px;
        background:rgba(255,255,255,1);
        border-right: 1px solid #DDDDDD;
        border-bottom:  0px;        
    }    
    .Content-pane3-nameschecked{
        position: absolute;
        top: 70px;
        left: 34.45%;
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Content-pane4{
        position: absolute;
        left: 75%;
        width:300px;
        height:119px;
        background:rgba(249,249,249,1);
        border-bottom:  1px solid #DDDDDD;
        cursor: pointer;        
    }
    .Content-pane4-img{
        position: absolute;
        top: 34px;
        left: 44%;
        width: 36px;
        height: 28px;
    }
    .Content-pane4-names{
        position: absolute;
        top: 70px;
        left: 40.67%;
        width:200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(204,204,204,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Contents .el-dialog{
        width: 420px;
        height: 140px;
    }
    .Contents .el-dialog__body{
        padding: 0;
        text-align: left;
        margin-left: 20px;
    }
    .Contents .el-dialog__header{
        text-align: left;
    }
</style>