<template>
    <div>
      <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-success="uploadsuccess">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible" size="tiny">
  <img width="60%" :src="dialogImageUrl" alt="">
</el-dialog>
    </div>
</template>


<style>

</style>

<script>
import mainServices from "@/services/mainServices.js"
  export default {
    data() {
      return {
        pic:this.$store.state.ImageName,
        dialogImage: this.$store.state.Image,
        dialogImageUrl: this.$store.state.ImageUrl,        
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.dialogImage.splice(file.url,1)
        //this.dialogImageUrl.splice({name: file.name, url: file.url}) 
        this.pic.splice(file.name,1)
        console.log(this.dialogImage);
        //console.log(this.dialogImageUrl);          
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadsuccess(response, file, fileList){
      var This = this;
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e){
        var index = this.result.indexOf(",");
        var imgbase = this.result.substring(index+1);
        console.log(imgbase); //base64编码       
        This.dialogImage.push(imgbase);
        console.log(This.dialogImage); 
        }
        //this.dialogImageUrl.push({name: file.name, url: file.url});            
        this.pic.push(file.name);       
        //console.log(dialogImageUrl);
        console.log(file.url);
      }
    }
  }
</script>