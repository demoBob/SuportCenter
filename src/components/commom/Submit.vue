<template>
    <div class="Submit">
       <div class="Submit-br"></div>        

        <div class="Submit-circle">1</div>
        <div class="Submit-circle2">2</div>
        <div class="Submit-circle3">3</div>
        <div class="Submit-circle4">4</div>

        <div class="Submit-name1">Choose Solution</div>
        <div class="Submit-name2">Case info</div>
        <div class="Submit-name3">Contact Info</div>
        <div class="Submit-name4">Submit</div>

        <img src="../../assets/img/submitted.png" class="Submit-img">
        <div class="Submit-Thanks">{{CaseNumber}}<br><br>Thanks!<br>Your ticket has been submitted</div>

        <el-button class="Submit-Finish" @click="ToMain">Finish</el-button>
   </div> 
</template>
<script>
export default {
    name:'Submit',
    data(){

    return{
        CaseNumber:this.$store.state.CaseNumber
    }
  },
  methods:{
    ToMain(){
      this.$router.push('/Main')
      this.GLOBAL.num = '1'
    }
  } 
}
</script>
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Submit{
        position: absolute;
        width:1200px;
        height: 760px;
    }
    .Submit-br{
        position: absolute;
        top: 47px;
        left: 29.67%;
        width:523px;
        height:2px;
        background:rgba(36,157,253,1);
    }

    .Submit-circle{
      position: absolute;
      top: 30px;
      left:26.67%;
      width:36px;
      height:36px;
      background:rgba(36,157,253,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Submit-circle2{
      position: absolute;
      top: 30px;
      left:42.25%;
      width:36px;
      height:36px;
      background:rgba(36,157,253,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Submit-circle3{
      position: absolute;
      top: 30px;
      left:57.75%;
      width:36px;
      height:36px;
      background:rgba(36,157,253,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Submit-circle4{
      position: absolute;
      top: 30px;
      left:73.17%;
      width:36px;
      height:36px;
      background:rgba(36,157,253,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Submit-name1{
      position: absolute;
      top: 72px;
      left:23.42%;
      width:200px;
      height:24px;
      font-size:14px;
      font-weight:500;
      color:rgba(36,157,253,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;
    }
    .Submit-name2{
      position: absolute;
      top: 72px;
      left:41.08%;
      width:150px;
      height:24px;
      font-size:14px;
      font-weight:400;
      color:rgba(36,157,253,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;
    }
    .Submit-name3{
      position: absolute;
      top: 72px;
      left:55.83%;
      width:150px;
      height:24px;
      font-size:14px;
      font-weight:400;
      color:rgba(36,157,253,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;
    }
    .Submit-name4{
      position: absolute;
      top: 72px;
      left:72.75%;
      width:100px;
      height:24px;
      font-size:14px;
      font-weight:400;
      color:rgba(36,157,253,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;
    }
    .Submit-Finish{
      position: absolute;
      top: 568px;
      left:40.83%;
      width:220px;
      height:52px;
      background:rgba(36,157,253,1);
      border-radius:4px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      font-family: 'Noto Sans TC', sans-serif;      
    }
    .Submit-Thanks{
        position: absolute;
        top: 378px;
        left:36.67%;
        width:340px;
        height:60px;
        font-size:22px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:30px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Submit-img{
        position: absolute;
        top: 121px;
        left:20.83%;
        width: 733px;
        height: 204px;
    }
</style>