<template>
    <div id="Changepassword">
        <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"  class="Changepassworddialog">
        
        <div class="Changepassword-CurrentPassword">Current Password</div>
        <input class="Changepassword-CurrentPassword-text" type="password" v-model="CurrentPassword">
        <div class="Changepassword-NewPassword">New Password</div>
        <input class="Changepassword-NewPassword-text" type="password" v-model="NewPassword">
        
        <div class="Changepassword-ConfirmNewPassword">Confirm New Password</div>
        <input class="Changepassword-ConfirmNewPassword-text" type="password" v-model="ConfirmNewPassword">

        <el-button class="Changepassword-Close" @click="ToMyAcount">Close</el-button>
        <el-button class="Changepassword-Update" @click="change">Update</el-button>

        
        
        
    </el-dialog>
    </div>
    
</template>

<script>
import mainServices from "@/services/mainServices.js"
export default {
    name:"changepwd",
    data(){
        return {
            visible:false,
            CurrentPassword:"",
            NewPassword:"",
            ConfirmNewPassword:"",
            Username:"",
            centerDialogVisible:false
        }
    },
    methods:{
        init(){
            this.visible = true
            this.$nextTick(() =>{
                
            })
        },
        ToMyAcount(){
            this.visible = false
        },
        change(){
            if(this.CurrentPassword != "" && this.CurrentPassword != null){
                if(this.NewPassword != "" && this.NewPassword != null){
                    if(this.ConfirmNewPassword != "" && this.ConfirmNewPassword != null){
                        if(this.NewPassword != this.ConfirmNewPassword){
                //alert('NewPassword and ConfirmNewPassword isdifferent,please enter again!');
                            this.$alert('New Password and Confirm New Password is different,please enter again!', 'Message', {
                                            confirmButtonText: 'OK'
                                            });
                        }else{
                            const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                            });
                            var CurrentPassword = this.CurrentPassword;
                            var username = this.Username;
                            var NewPassword = this.NewPassword;
                            mainServices.ChangePassword(username,CurrentPassword,NewPassword)
                            .then(Response =>{
                                console.log(Response.isSuccess)
                                if(Response.isSuccess == true){
                                    //alert(Response.data);
                                    loading.close();
                                    this.$alert(Response.data, 'Message', {
                                            confirmButtonText: 'OK',
                                            callback: action => {
                                                    this.visible = false
                                                    this.$router.push({
                                                        path: '/'
                                                    }) 
                                                    }                                
                                            });
                                }else{
                                    loading.close();
                                    //alert('Incorrect password');
                                    this.$alert(Response.exception.Message, 'Message', {
                                            confirmButtonText: 'OK'
                                            });                                      
                                }
                            })
                            .catch(error =>{
                                console.log(error);
                                this.$alert('ChangePassword failed, please try again', 'Message', {
                                        confirmButtonText: 'OK'
                                            });
                                loading.close();
                            })
                        }
                    }else{
                        this.$alert('Please enter Confirm New Password !', 'Message', {
                                        confirmButtonText: 'OK'
                                    });
                    }
                }else{
                    this.$alert('Please enter New Password !', 'Message', {
                                    confirmButtonText: 'OK'
                                });
                }
            }else{
                this.$alert('Please enter Current Password !', 'Message', {
                                confirmButtonText: 'OK'
                               });
            }
        }
    },
    created(){
        this.Username = sessionStorage.getItem('username');
    }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Changepassword{
        position: absolute;
        width:600px;
        height:600px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }

        .Changepassword-CurrentPassword{
        position: absolute;
        top: 108px;
        left: 50px;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Changepassword-CurrentPassword-text{
        position: absolute;
        top: 146px;
        left: 50px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:rgba(51,51,51,1);
        font-weight:normal;      
    }
    
    .Changepassword-ConfirmNewPassword{
        position: absolute;
        top: 328px;
        left: 50px;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Changepassword-ConfirmNewPassword-text{
        position: absolute;
        top: 366px;
        left: 50px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:rgba(51,51,51,1); 
        font-weight:normal;       
    }

    .Changepassword-NewPassword{
        position: absolute;
        top: 218px;
        left: 50px;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Changepassword-NewPassword-text{
        position: absolute;        
        top: 256px;
        left: 50px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:rgba(51,51,51,1);
        font-weight:normal;       
    }

    .Changepassword-Close{
        position: absolute;
        top: 500px;
        left:50px;
        width:220px;
        height:46px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    .Changepassword-Update{
        position: absolute;
        top: 500px;
        left:290px;
        width:220px;
        height:46px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    
    
    #Changepassword .el-dialog{
        margin: 0px;
        left: 650px;
        position: absolute;
        width:600px;
        height:600px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }
       
    
    
</style>

