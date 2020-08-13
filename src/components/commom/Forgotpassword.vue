<template>
    <div id="Forgotpassword">
        <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible" >
        
        <div class="Forgotpassword-name">
            To recover your account,begin by entering your username<br> and email and the characters in the picture. 
        </div>
        <div class="Forgotpassword-Username" id="close">User Name</div>
        <input class="Forgotpassword-Username-text" type="text" v-model="Username">
        <div class="Forgotpassword-Email">Email</div>
        <input class="Forgotpassword-Email-text" type="text" v-model="Email">
        
        <div class="Forgotpassword-Captcha">Captcha</div>
        <div class="Captcha">
            <canvas id="s-canvas" ></canvas>
            
                <i class="loading" @click="createdCode">
                <img src="../../assets/img/loading.png">
            </i>
                       
        </div>
        <input class="Forgotpassword-Captcha-text" type="text" v-model="Captcha">

        <el-button class="Forgotpassword-Close" @click="ToLogin">Cancle</el-button>
        <el-button class="Forgotpassword-Next" @click="forgotpwd" >Next</el-button>

        
        
    </el-dialog>
    </div>
    
</template>

<script>

import mainServices from "@/services/mainServices.js"
export default {
    inject:["reload"],
    name:"forgotpwd",
    props: {
    fontSizeMin: {
       type: Number,
       default: 36
     },
     fontSizeMax: {
       type: Number,
       default: 48
     },
     backgroundColorMin: {
      type: Number,
       default: 255
     },
     backgroundColorMax: {
       type: Number,
       default: 255
    },
     colorMin: {
       type: Number,
       default: 0
     },
     colorMax: {
       type: Number,
       default: 160
     },
     lineColorMin: {
       type: Number,
       default: 100
     },
     lineColorMax: {
       type: Number,
       default: 255
    },
     dotColorMin: {
       type: Number,
      default: 0
     },
     dotColorMax: {
       type: Number,
       default: 255
     },
     contentWidth: {
       type: Number,
       default: 200
     },
    contentHeight: {
       type: Number,
      default: 150
     }
    },
    data(){
        return {
            visible:false,
            Username:"",
            Email:"",
            Captcha:"",
            identifyCode: ''
        }
    },
    methods:{
        init(){
            this.visible = true
            this.$nextTick(() =>{
                this.createdCode();
            })
        },
        ToLogin(){
            this.visible = false
        },
        forgotpwd(){
            if(this.Username != ""){
                if(this.Email != ""){
                    if(this.Captcha != ""){
                        if(this.Captcha != this.identifyCode){
                                this.$alert('Verification code is wrong!', 'Message', {
                                                confirmButtonText: 'OK'
                                            });
                            }else{
                                const loading = this.$loading({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                                });
                                var username = this.Username;
                                var Email = this.Email;
                                mainServices.ForgotPassword(username,Email)
                                .then(Response =>{
                                    console.log(Response.isSuccess)
                                    if(Response.isSuccess == true){
                                        //alert(Response.data);
                                        loading.close();
                                        this.$alert(Response.data, 'Message', {
                                                confirmButtonText: 'OK',
                                                callback: action => {
                                                        this.visible = false 
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
                                    this.$alert('ForgotPassword failed, please try again', 'Message', {
                                                    confirmButtonText: 'OK'
                                                });
                                    loading.close();
                                })
                            }
                    }else{
                        this.$alert('Please enter Captcha !', 'Message', {
                                confirmButtonText: 'OK'
                               }); 
                    }
                }else{
                    this.$alert('Please enter Email !', 'Message', {
                                confirmButtonText: 'OK'
                               }); 
                }
            }else{
                this.$alert('Please enter Username !', 'Message', {
                                confirmButtonText: 'OK'
                               });
            }
            
        },
            // 生成4个随机数
createdCode () {
       const len = 4
       const codeList = []
       const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
       const charsLen = chars.length
       for (let i = 0; i < len; i++) {
         codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
       }
       this.identifyCode = codeList.join('')
       this.$emit('getIdentifyCode', this.identifyCode.toLowerCase())
       this.drawPic()
     },
 
     // 生成一个随机数
     randomNum (min, max) {
       return Math.floor(Math.random() * (max - min) + min)
     },
     // 生成一个随机的颜色
     randomColor (min, max) {
       const r = this.randomNum(min, max)
       const g = this.randomNum(min, max)
       const b = this.randomNum(min, max)
       return 'rgb(' + r + ',' + g + ',' + b + ')'
     },
     
     drawPic() {
          const canvas = document.getElementById('s-canvas')
          const ctx = canvas.getContext('2d')       
          ctx.textBaseline = 'bottom'
          // 绘制背景
          ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
          ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
          // 绘制文字
          for (let i = 0; i < this.identifyCode.length; i++) {
            this.drawText(ctx, this.identifyCode[i], i)
          }
          this.drawLine(ctx)
          this.drawDot(ctx)
            
     },
 
     drawText (ctx, txt, i) {
       ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
       ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
       const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
       const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
       var deg = this.randomNum(-45, 45)
       // 修改坐标原点和旋转角度
       ctx.translate(x, y)
       ctx.rotate(deg * Math.PI / 180)
       ctx.fillText(txt, 0, 0)
       // 恢复坐标原点和旋转角度
       ctx.rotate(-deg * Math.PI / 180)
       ctx.translate(-x, -y)
     },
 
     // 绘制干扰线
     drawLine (ctx) {
       for (let i = 0; i < 5; i++) {
         ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
         ctx.beginPath()
         ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
         ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
         ctx.stroke()
       }
     },
 
     // 绘制干扰点
     drawDot (ctx) {
      for (let i = 0; i < 80; i++) {
         ctx.fillStyle = this.randomColor(0, 255)
         ctx.beginPath()
         ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
         ctx.fill()
        }
    }
    },
    mounted:function(){
            //    this.$nextTick(() =>{
            //     document.getElementById('createcode').click()
            //   })
            
                          
      
    }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Forgotpassword{
        position: absolute;
        width:600px;
        height:700px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }

    .Forgotpassword-name{
        position: absolute;
        top: 15px;
        left: 70px;
        line-height: 28px;
        font-size:18px;
        font-weight:normal;
        color:#5f6267;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

        .Forgotpassword-Username{
        position: absolute;
        top: 108px;
        left: 70px;
        width:135px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:#5f6267;
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Forgotpassword-Username-text{
        position: absolute;
        top: 146px;
        left: 70px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:#5f6267;
        font-weight:normal;
        font-family: 'Noto Sans TC', sans-serif;      
    }
    
    .Forgotpassword-Captcha{
        position: absolute;
        top: 328px;
        left: 70px;
        width:174px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:#5f6267;
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Forgotpassword-Captcha-text{
        position: absolute;
        top: 536px;
        left: 70px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:#5f6267; 
        font-weight:normal;
        font-family: 'Noto Sans TC', sans-serif;       
    }

    .Forgotpassword-Email{
        position: absolute;
        top: 218px;
        left: 70px;
        width:110px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:#5f6267;
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Forgotpassword-Email-text{
        position: absolute;        
        top: 256px;
        left: 70px;
        width:460px;
        height:52px;
        padding-left: 12px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:#5f6267;
        font-weight:normal;
        font-family: 'Noto Sans TC', sans-serif;       
    }

    .Forgotpassword-Close{
        position: absolute;
        top: 630px;
        left:70px;
        width:220px;
        height:46px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    .Forgotpassword-Next{
        position: absolute;
        top: 630px;
        left:310px;
        width:220px;
        height:46px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    
    #Forgotpassword .el-dialog{
        margin: 0px;
        left: 650px;
        width:600px;
        height:700px;
        position: absolute;
    }
       
    .Captcha{
        position: absolute;
        top: 360px;
        left: 70px;
        width:460px; 
        height:120px;        
    }
    
    #s-canvas{
        position: absolute;
        width:250px; 
        height:150px;
        left: 0px;
    }
    .loading{
        position: absolute;
        top: 60px;
        width:32px; 
        height:32px;
        right: 240px;
        cursor: pointer;
    }

    .loading img{
        width:32px; 
        height:32px;
    }
</style>

