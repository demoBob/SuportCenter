<template>
    <div id="ImageUploaded">
        <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"  class="ImageUploadeddialog" append-to-body>
        <div class="Imageload">
            <img :src="Image">
        </div>

        
        
        
    </el-dialog>
    </div>
    
</template>

<script>
export default {
    name:"ImageUploaded",
    data(){
        return {
            visible:false,
            Image:""
        }
    },
    methods:{
        init(Image){
            this.visible = true
            this.$nextTick(() =>{
                this.Image = Image;
            })
        }       
    }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .ImageUploaded{
        position: absolute;
        width:600px;
        height:600px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }
               
    .el-dialog__body{
        margin: 0px;
        width:600px;
        height:500px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }

    .el-dialog{
        width: 600px;
    }
       
    .Imageload{
        border-radius:6px;
        border:2px solid rgba(0,126,227,0.2);
        position: absolute;
        left: 50px;
        top: 100px;
        width: 500px;
        height: 360px;
    }

    .Imageload img{
        width: 495px;
        height: 355px;
    }
    
</style>

