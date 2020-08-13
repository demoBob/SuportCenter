<template>
    <div class="MyAcount">
        <div class="MyAcount-name">My Account</div>

        <div class="MyAcount-username">User Name</div>
        <input class="MyAcount-username-text" type="text" readonly="readonly" v-model="this.username">

        <div class="MyAcount-Password">Password</div>       
        <input class="MyAcount-Password-text" type="password" readonly="readonly" v-model="this.password">
        <div class="MyAcount-ChangePassword" @click="changepwd">
            Change Password
        </div>       

        <div class="MyAcount-FirstName">First Name</div>
        <input class="MyAcount-FirstName-text" type="text" v-model="this.$store.state.FirstName" readonly="readonly">

        <div class="MyAcount-LastName">Last Name</div>
        <input class="MyAcount-LastName-text" type="text" v-model="this.$store.state.LastName" readonly="readonly">

        <div class="MyAcount-EmailAddress">Email Address</div>
        <input class="MyAcount-EmailAddress-text" type="text" v-model="this.$store.state.EmailAddress" readonly="readonly">

        <div class="MyAcount-Preferred">Preferred Method of Contact</div>
        <!--
            <input class="MyAcount-Preferred-text" type="text">
        -->     
        <el-select  v-model="this.$store.state.PreferredContactMethod" disabled slot="prepend" placeholder="" readonly="readonly">
        <el-option label="Email/Phone" value="Email/Phone"  class="MyAcount-option"></el-option>
          <el-option label="Email" value="Email" class="MyAcount-option"></el-option>
          <el-option label="Phone" value="Phone"  class="MyAcount-option"></el-option>
        </el-select>

        <div class="MyAcount-BusinessPhone">Business Phone</div>
        <input class="MyAcount-BusinessPhone-text" type="text" v-model="this.$store.state.BusinessPhone" readonly="readonly">

        <div class="MyAcount-MobilePhone">Mobile Phone</div>
        <input class="MyAcount-MobilePhone-text" type="text" v-model="this.$store.state.MobilePhone" readonly="readonly">

        <div class="MyAcount-CompanyName">Company Name</div>
        <input class="MyAcount-CompanyName-text" type="text" readonly="readonly" v-model="this.$store.state.CompanyName">

        <div class="MyAcount-CompanyAddress">Company Address</div>
        <input class="MyAcount-CompanyAddress-text" type="text" readonly="readonly" v-model="this.$store.state.CompanyAddress">

        <div class="MyAcount-Support">Support Effective period</div>
        <div class="MyAcount-Support-from">From</div>
        <div class="MyAcount-Support-to">To</div>
        <input class="MyAcount-Support-textfrom" type="text" readonly="readonly" v-model="this.$store.state.SupportEffectivePeriodFrom">
        <input class="MyAcount-Support-textto" type="text" readonly="readonly" v-model="this.$store.state.SupportEffectivePeriodTo">

        <div class="MyAcount-ContractStatus">Contract Status</div>
        <input class="MyAcount-ContractStatus-text" type="text" readonly="readonly" v-model="this.$store.state.ContractStatus">
        
            <div class="MyAcount-Entitlement">Entitlement</div>
            <!--
<input class="MyAcount-Entitlement-text" type="text" readonly="readonly">
<el-button class="MyAcount-Update">Update</el-button>
            -->           
            <div class="MyAcount-Entitlement-text">
                <a href="#">{{this.$store.state.Entitlement}}</a>
            </div> 
        
        
        <div class="MyAcount-Consulting">Total Tokens Included</div>
        <input class="MyAcount-Consulting-text" type="text" readonly="readonly" v-model="this.$store.state.ConsultingTokenIncluded">

        <div class="MyAcount-Remaining">Remaining</div>
        <input class="MyAcount-Remaining-text" type="text" readonly="readonly" v-model="this.$store.state.Remaining">

        

        <Changepassword v-if="ChangepasswordVisible" ref="toChangepassword"></Changepassword>
        <Feedbackdetails v-if="FeedbackdetailsVisible" ref="toFeedbackdetails"></Feedbackdetails>
    </div>
</template>
<script>
import Changepassword from '@/components/commom/Changepassword'
import Feedbackdetails from '@/components/commom/Feedbackdetails'
import encryption from '@/services/encryption.js'
export default {
    name:"MyAcount",
    components:{
        Changepassword,
        Feedbackdetails
    },
    data(){
        return {
            ChangepasswordVisible: false,
            FeedbackdetailsVisible:false,
            Entitlement:'Entitled Details',
            username:"",
            password:""
        }
    },
    methods:{
        changepwd(){
            this.ChangepasswordVisible = true
            this.$nextTick(() => {
            this.$refs.toChangepassword.init()
            })
        }
    },
    computed: {

    },
    created(){
        this.username = sessionStorage.getItem('username');
        this.password = encryption.decryptBy(sessionStorage.getItem('password'));
    }
}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .MyAcount{
        position: absolute;
        width:1200px;
        height:1296px;
        background:rgba(255,255,255,1);
    }
    .MyAcount-name{
        position: absolute;
        top: 40px;
        left: 4.17%;
        width:300px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-username{
        position: absolute;
        top: 103px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-username-text{
        position: absolute;
        top: 141px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;        
    }
    
    .MyAcount-Password{
        position: absolute;
        top: 103px;
        left: 57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-Password-text{
        position: absolute;
        top: 141px;
        left: 57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-weight:normal;         
    }

    .MyAcount-ChangePassword{
        position: absolute;
        top: 201px;
        left: 57.5%;
        width:348px;
        height:22px;
        font-size:16px;
        font-weight:400;        
        line-height:22px;
        color:rgba(34,73,199,1);
        text-align: left;
        font-family: 'Noto Sans TC', sans-serif;
        cursor: pointer;
    }
   
    .MyAcount-FirstName{
        position: absolute;
        top: 243px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-FirstName-text{
        position: absolute;
        top: 281px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);          
        font-family: 'Noto Sans TC', sans-serif;          
    }

    .MyAcount-LastName{
        position: absolute;
        top: 243px;
        left: 57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-LastName-text{
        position: absolute;
        top: 281px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;         
    }

    .MyAcount-EmailAddress{
        position: absolute;
        top: 363px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-EmailAddress-text{
        position: absolute;
        top: 410px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;             
    }

    .MyAcount-Preferred{
        position: absolute;
        top: 363px;
        left: 57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-Preferred-text{
        position: absolute;
        top: 401px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;           
    }

    .MyAcount ::-webkit-input-placeholder{
      position: relative;      
      left:12px;
      width:400px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(0,0,0,0.25);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif;
    }

    .el-select{
      position: absolute;
      top: 401px;
      left:57.5%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      font-family: 'Noto Sans TC', sans-serif;
    }   
    .MyAcount .el-input{
      height:56px;
      font-family: 'Noto Sans TC', sans-serif;
      border:1px solid rgba(0,0,0,0.15);
      border-radius:4px;
    }
    .MyAcount .el-input__inner{
      height:56px;
      padding:12px;
      font-size:16px;
      font-family: 'Noto Sans TC', sans-serif;
      background:rgba(241,241,241,1);
      color:rgba(0,0,0,0.25);
    }

    .el-input.is-disabled .el-input__inner{
        background-color: rgba(241,241,241,1);
    }
    

    .MyAcount-BusinessPhone{
        position: absolute;
        top: 483px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-BusinessPhone-text{
        position: absolute;
        top: 521px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;              
    }

    .MyAcount-MobilePhone{
        position: absolute;
        top: 483px;
        left: 57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-MobilePhone-text{
        position: absolute;
        top: 521px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;             
    }

    .MyAcount-CompanyName{
        position: absolute;
        top: 603px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-CompanyName-text{
        position: absolute;
        top: 641px;
        left:4.17%;
        width:1100px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;        
    }

    .MyAcount-CompanyAddress{
        position: absolute;
        top: 723px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-CompanyAddress-text{
        position: absolute;
        top: 761px;
        left:4.17%;
        width:1100px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;        
    }

    .MyAcount-Support{
        position: absolute;
        top: 843px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .MyAcount-Support-from{
        position: absolute;
        top: 881px;
        left: 4.17%;
        width:50px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }

    .MyAcount-Support-to{
        position: absolute;
        top: 881px;
        left: 57.5%;
        width:20px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }

    .MyAcount-Support-textfrom{
        position: absolute;
        top: 921px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;       
    }
    .MyAcount-Support-textto{
        position: absolute;
        top: 921px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;       
    }

    .MyAcount-ContractStatus{
        position: absolute;
        top: 1003px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-ContractStatus-text{
        position: absolute;
        top: 1041px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);  
        font-family: 'Noto Sans TC', sans-serif;      
    }

    .MyAcount-Consulting{
        position: absolute;
        top: 1123px;
        left: 4.17%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-Consulting-text{
        position: absolute;
        top: 1161px;
        left:4.17%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;       
    }

    .MyAcount-Entitlement{
        position: absolute;
        top: 1003px;
        left: 57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-Entitlement-text{
        position: absolute;
        top: 1041px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 16px;
        font-size:14px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25);
        font-family: 'Noto Sans TC', sans-serif;        
    }

    .MyAcount-Entitlement-text a{
        position: absolute;
        left: 12px;
        top:14px;
    }

    .MyAcount-Remaining{
        position: absolute;
        top: 1123px;
        left:57.5%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .MyAcount-Remaining-text{
        position: absolute;
        top: 1161px;
        left:57.5%;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;       
    }
    .MyAcount-Update{
        position: absolute;
        top: 1244px;
        left:77.27%;
        width:220px;
        height:46px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    .MyAcount-option{
        font-family: 'Noto Sans TC', sans-serif;
        font-size:16px;
    }
</style>