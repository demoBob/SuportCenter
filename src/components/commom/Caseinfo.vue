<template>
    <div class="Caseinfo">
        <div class="Caseinfo-br"></div>
        <div class="Caseinfo-br2"></div>

        <div class="Caseinfo-circle">1</div>
        <div class="Caseinfo-circle2">2</div>
        <div class="Caseinfo-circle3">3</div>
        <div class="Caseinfo-circle4">4</div>

        <div class="Caseinfo-name1">Choose Solution</div>
        <div class="Caseinfo-name2">Case info</div>
        <div class="Caseinfo-name3">Contact Info</div>
        <div class="Caseinfo-name4">Submit</div>

        <div class="Caseinfo-infoname">Case Info</div>
        
        <!--
            <div class="Caseinfo-typename">Case Type</div>
            <div v-if="casetype == 'Question'">
            <div class="Caseinfo-questioncheck">
                <img src="../../assets/img/questionshow.png" class="Caseinfo-question-img">
                <div class="Caseinfo-question-namecheck">Question</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-question" @click="ToQuestion">
                <img src="../../assets/img/questionshow.png" class="Caseinfo-question-img">              
                <div class="Caseinfo-question-name">Question</div>
            </div>
        </div>
        <div v-if="casetype == 'Problem'">
            <div class="Caseinfo-Problemcheck">
                <img src="../../assets/img/problemshow.png" class="Caseinfo-question-img">
                <div class="Caseinfo-Problem-namecheck">Problem</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-Problem" @click="ToProblem">
                <img src="../../assets/img/problemshow.png" class="Caseinfo-question-img">
                <div class="Caseinfo-Problem-name">Problem</div>
            </div>
        </div>
        <div v-if="casetype == 'Request'">
            <div class="Caseinfo-Requestcheck">
                <img src="../../assets/img/requestshow.png" class="Caseinfo-question-img">
                <div class="Caseinfo-Request-namecheck">Request</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-Request" @click="ToRequest">
                <img src="../../assets/img/requestshow.png" class="Caseinfo-question-img">
                <div class="Caseinfo-Request-name">Request</div>
            </div>
        </div>
        -->
        
        
        <div class="Caseinfo-CaseSubject">Case Subject*</div>
        <input class="Caseinfo-CaseSubject-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'" v-model="CaseTitle" ref="CaseSubject">

        <div class="Caseinfo-Description">Description*</div>
            <!-- <div id="editorMenu" class="editorMenu"></div>
            <div id="editor" class="editor" hidden="hidden"></div> -->
            <textarea class="Caseinfo-Description-textarea" v-model="Description" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'" style="text-align:left; z-index: 0;"></textarea>

        <div class="Caseinfo-IssueDate">Issue Date*</div>
        <!--<input class="Caseinfo-IssueDate-text" type="datetime-local" placeholder="Please choose" onfocus="this.placeholder=''" onblur="this.placeholder='Please choose'">-->
        
        <el-date-picker
      v-model="IssueDate"
      type="datetime"
      placeholder="Please choose" class="Caseinfo-IssueDate-text" value-format="MM/dd/yyyy HH:mm:ss" format="MM/dd/yyyy HH:mm:ss">
    </el-date-picker>

        <div class="Caseinfo-SeverityLevel">Severity Level*</div>
        <el-select  v-model="Severity" slot="prepend" placeholder="Please choose">
          <el-option label="Critical" value="Critical"  class="Caseinfo-option"></el-option>
          <el-option label="High" value="High"  class="Caseinfo-option"></el-option>
          <el-option label="Medium" value="Medium"  class="Caseinfo-option"></el-option>
          <el-option label="Low" value="Low"  class="Caseinfo-option"></el-option>
        </el-select>

        <div class="Caseinfo-OperationAffected">Operation Affected*</div>
        <textarea rows="2" cols="20" class="Caseinfo-OperationAffected-textarea"  type="text" placeholder="Please fill in how the operation affected,
 e.g. All users/ 1 user / a few users affected" onfocus="this.placeholder=''" onblur="this.placeholder='Please fill in how the operation affected,
 e.g. All users/ 1 user / a few users affected'" v-model="OperationAffected">
        </textarea>

        <div class="Caseinfo-ImageUpload">Image Upload</div>
        
            <div class="Caseinfo-ImageUploadbutton">
                <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="uploadsuccess"
                >
                <i class="el-icon-plus"></i>
                </el-upload> -->
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    list-type="picture"                                       
                    :on-remove="handleRemove"
                    :before-upload="beforeupload"
                    accept=".jpg,.jpeg,.txt,.png,.pdf"
                    v-loading.fullscreen.lock="loading"
                    :http-request="httpRequest">                   
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="uploadprompt">#File size: 5 MB or below.<br> Format: JPG ,  PNG ,Txt or PDF only</div>              
            </div>
        
        <!--
        <Upload class="Caseinfo-ImageUploadbutton">            
        </Upload>        
         -->


        <el-button class="Caseinfo-Next" :disabled="display" @click="ToContactInfo">Next</el-button>
        <el-button class="Caseinfo-Back"  @click="ToChooseSolution">Back</el-button>
    </div>
</template>


<script>
import Editor from '@/components/commom/Editor'
import Upload from '@/components/commom/Upload'
import E from 'wangeditor'
export default {    
    inject:["reload"],
    name:'Caseinfo',
    components:{
        Editor,
        Upload
    },
    data(){
        return{
            dialogImageUrl: this.$store.state.ImageUrl,        
            dialogVisible: false,
            loading:false,
            casetype:"",            
            CaseTitle: this.$store.state.CaseTitle,
            IssueDate: this.$store.state.IssueDate,
            Severity: this.$store.state.Severity,
            OperationAffected: this.$store.state.OperationAffected,
            pic:this.$store.state.ImageName,
            dialogImage: this.$store.state.Image,
            editorContent: this.$store.state.Description,
            Description: this.$store.state.Description,
            files:this.$store.state.files,
            Filename:"",
            imgbase:"",
            display:false
        }
    },methods:{
        //这个file参数 也就是文件信息，你使用 插件 时 你就可以打印出文件信息 看看嘛
        getBase64(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                let fileResult = "";
                reader.readAsDataURL(file);
        　　　　　//开始转
                reader.onload = function() {
                fileResult = reader.result;
                };
        　　　　　//转 失败
                reader.onerror = function(error) {
                reject(error);
                };
        　　　　　//转 结束  咱就 resolve 出去
                reader.onloadend = function() {
                resolve(fileResult);
                };
            });
            },
        httpRequest(data){
            　　// 没事儿就打印data看看呗
        　　　　//这是限制上传文件类型                
                        // 转base64
                        this.Filename = data.file.name;
                        this.getBase64(data.file).then(resBase64 => {
                        this.imgbase = resBase64.split(',')[1]　　//直接拿到base64信息
                        this.files.push({FileName: this.Filename,FileBody:this.imgbase});
                        console.log(this.files)
                        })
                        this.$message({
                        showClose: true,
                        duration:1500,
                        message: 'Upload Success!',
                        type: 'success'
                        });                                         
            },
        handleRemove(file, fileList) {
        //alert('test2')
        this.display = false;
        console.log(file, fileList);
        var index =  this.files.findIndex(item => item.FileName === file.name);
        if(index == -1){
           // this.files = []
        }else{
            this.files.splice(index,1)
        }
        
        console.log(this.files);        
        },
        handlePictureCardPreview(file) {                       
            this.dialogImageUrl = file.url;           
        },
        uploadsuccess(response, file, fileList){            
        var This = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
            var index = this.result.indexOf(",");
            This.imgbase = this.result.substring(index+1); 
            This.files.push({FileName: file.name,FileBody:This.imgbase});
            }
                                 
            this.display = false;                  
            console.log(this.files);
        },
        beforeupload(file){
            console.log(file.type);
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isTxT = file.type === 'text/plain';
            const isPDF = file.type === 'application/pdf';
            const isLt5M = file.size / 1024 / 1024 < 5;
            if(!isLt5M){
                this.$alert('The upload file size cannot exceed 5MB!', 'Message', {
                                confirmButtonText: 'OK'
                                });
                return false;                               
            }else if(!isJPG && !isPNG && !isTxT && !isPDF){
                this.$alert('The upload file format only JPG ,PNG,Txt or PDF!', 'Message', {
                                confirmButtonText: 'OK'
                                });
                return false;
            }else{
                return isLt5M;
            }
            
        },uploaderror(err, file, fileList){
            console.log(err);
            this.$alert("Upload failed, please try again later", 'Message', {
                                confirmButtonText: 'OK'
                                });
            this.display = false;
        },
        ToQuestion(){
            this.casetype = "Question"
        },ToProblem(){
            this.casetype = "Problem"
        },ToRequest(){
            this.casetype = "Request"
        },ToChooseSolution(){
            this.$store.commit('clearimg')
            const caseinfo = {
               CaseTitle : this.CaseTitle,
               IssueDate : this.IssueDate,
               Severity : this.Severity,
               OperationAffected : this.OperationAffected,
               files : this.files,
               Description : this.Description
            }
            
            this.$store.commit('Caseinfo',caseinfo)
            this.GLOBAL.num = '1'            
            this.reload()
        },ToContactInfo(){
            //<p><br></p>
            if(this.CaseTitle != "" && this.CaseTitle != null){
                if(this.Description != "" && this.Description != null){
                    if(this.IssueDate != "" && this.IssueDate != null){
                        if(this.Severity != "" && this.Severity != null){
                            if(this.OperationAffected != "" && this.OperationAffected != null){
                            const caseinfo = {
                                        CaseTitle : this.CaseTitle,
                                        IssueDate : this.IssueDate,
                                        Severity : this.Severity,
                                        OperationAffected : this.OperationAffected,
                                        files : this.files,
                                        Description : this.Description
                                        }
                                        
                                        this.$store.commit('Caseinfo',caseinfo)
                                        this.GLOBAL.type = "CreateTicket"
                                        this.GLOBAL.num = '3'
                                        this.reload()                                
                            }else{
                                this.$alert('Operation Affected Can not be empty!', 'Message', {
                                                confirmButtonText: 'OK'
                                            });
                            }                        
                        }else{
                            this.$alert('Severity Level Can not be empty!', 'Message', {
                                            confirmButtonText: 'OK'
                                        });
                        }                    
                    }else{
                        this.$alert('Issue Date Can not be empty!', 'Message', {
                                        confirmButtonText: 'OK'
                                    });
                    }                
                }else{
                    this.$alert('Description Can not be empty!', 'Message', {
                                    confirmButtonText: 'OK'
                                });
                }
            }else{
                this.$alert('Case Subject Can not be empty!', 'Message', {
                                confirmButtonText: 'OK'
                               });
            }
/*                 this.$alert('Please wait for the picture to be uploaded successfully', 'Message', {
                                confirmButtonText: 'OK'
                                });
 */               
            }
        }
        ,mounted() {
        this.$nextTick(() =>{
            this.$refs.CaseSubject.focus();
        })      
        // document.getElementById('#CaseSubject').val("").focus();
        // var editor = new E('#editorMenu', '#editor')
        // editor.customConfig.onchange = (html) => {
        //   //this.editorContent = editor.txt.text();
        //   this.editorContent = html
        // }
        // editor.create()
        // editor.txt.html(this.$store.state.Description);
        
      }
}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Caseinfo{
        width:1200px;
        height:1439px;
        background:rgba(255,255,255,1);
        position: absolute;
    }
    .Caseinfo-br{
        position: absolute;
        top: 47px;
        left: 29.67%;
        width:184px;
        height:2px;
        background:rgba(36,157,253,1);
    }
    .Caseinfo-br2{
        position: absolute;
        top: 47px;
        left: 45.08%;
        width:338px;
        height:2px;
        background:rgba(239,239,239,1);
    }

    .Caseinfo-circle{
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
    .Caseinfo-circle2{
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
    .Caseinfo-circle3{
      position: absolute;
      top: 30px;
      left:57.75%;
      width:36px;
      height:36px;
      background:rgba(239,239,239,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(204,204,204,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-circle4{
      position: absolute;
      top: 30px;
      left:73.17%;
      width:36px;
      height:36px;
      background:rgba(239,239,239,1);
      border-radius:100%; 
      font-size:18px;
      font-weight:600;
      color:rgba(204,204,204,1);
      line-height:36px;
      font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-name1{
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
    .Caseinfo-name2{
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
    .Caseinfo-name3{
      position: absolute;
      top: 72px;
      left:55.83%;
      width:150px;
      height:24px;
      font-size:14px;
      font-weight:400;
      color:rgba(217,217,217,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;
    }
    .Caseinfo-name4{
      position: absolute;
      top: 72px;
      left:72.75%;
      width:100px;
      height:24px;
      font-size:14px;
      font-weight:400;
      color:rgba(217,217,217,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;text-align: left;
    }
    .Caseinfo-infoname{
        position: absolute;
        top: 136px;
        left:4.17%;
        width:150px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(36,157,253,1);
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Caseinfo-typename{
        position: absolute;
        top: 189px;
        left:4.17%;
        width:79px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }

    .Caseinfo-question{
        position: absolute;
        top: 227px;
        left:4.17%;
        width:158px;
        height:100px;
        border-radius:8px;       
        border:1px solid rgba(248, 248, 248, 1);
        background: rgba(248, 248, 248, 1);
        cursor: pointer; 
    }
    .Caseinfo-question-img{
        position: absolute;        
        right: 35px;
    }
    .Caseinfo-question-name{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(217, 217, 217, 1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-questioncheck{
        position: absolute;
        top: 227px;
        left:4.17%;
        width:158px;
        height:100px;
        border-radius:8px;
        background: rgba(248, 248, 248, 1);
        border:1px solid rgba(36,157,253,1);
    }
    .Caseinfo-question-namecheck{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }

    .Caseinfo-Problem{
        position: absolute;
        top: 227px;
        left:19.42%;
        width:158px;
        height:100px;        
        border-radius:8px;       
        border:1px solid rgba(248, 248, 248, 1);
        background: rgba(248, 248, 248, 1);
        cursor: pointer;
    }
    .Caseinfo-Problem-name{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(217, 217, 217, 1);
        line-height:22px;
    }
    .Caseinfo-Problemcheck{
        position: absolute;
        top: 227px;
        left:19.42%;
        width:158px;
        height:100px;      
        border-radius:8px;
        background: rgba(248, 248, 248, 1);
        border:1px solid rgba(36,157,253,1);
    }
    .Caseinfo-Problem-namecheck{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
    }

    .Caseinfo-Request{
        position: absolute;
        top: 227px;
        left:34.67%;
        width:158px;
        height:100px;
        border-radius:8px;       
        border:1px solid rgba(248, 248, 248, 1);
        background: rgba(248, 248, 248, 1);
        cursor: pointer;
    }
    .Caseinfo-Request-name{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(217, 217, 217, 1);
        line-height:22px;
    }
    .Caseinfo-Requestcheck{
        position: absolute;
        top: 227px;
        left:34.67%;
        width:158px;
        height:100px;
        border-radius:8px;
        background: rgba(248, 248, 248, 1);
        border:1px solid rgba(36,157,253,1);
    }
    .Caseinfo-Request-namecheck{
        position: absolute;
        top: 65px;
        left:32.5%;
        width:59px;
        height:22px;
        font-size:14px;
        font-weight:400;
        color:rgba(36,157,253,1);
        line-height:22px;
    }
    .Caseinfo-CaseSubject{
        position: absolute;
        top: 179px;
        left:4.17%;
        width:200px;
        text-align: left;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-CaseSubject-text{
        position: absolute;
        top: 217px;
        left:4.17%;
        width:1098px;
        height:48px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        padding-left: 12px;
    }

    .Caseinfo ::-webkit-input-placeholder{
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
    .Caseinfo-IssueDate{
        position: absolute;
        top: 699px;
        left:4.17%;
        width:200px;
        text-align: left;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-IssueDate-text{
        position: absolute;
        top: 737px;
        left:4.17%;
        width:460px;
        height:52px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
                
    }
    .Caseinfo-SeverityLevel{
        position: absolute;
        top: 699px;
        left:57.5%;
        width:200px;
        text-align: left;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo .el-select{
      position: absolute;
      top: 737px;
      left:57.5%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      font-family: 'Noto Sans TC', sans-serif;
    }

    .Caseinfo-option{
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 16px;
    }   
   .Caseinfo .el-input{
      height:56px;
      font-family: 'Noto Sans TC', sans-serif;
    }
   .Caseinfo .el-input__inner{
      height:56px;
      padding:12px;
      font-family: 'Noto Sans TC', sans-serif;
      font-size: 16px;
    }
   /* .Caseinfo .el-icon-arrow-up:before{      
        content: url(../../assets/img/Down.png);
        width: 12px;
        height: 9px;      
    } */

    .Caseinfo-OperationAffected{
        position: absolute;
        top: 819px;
        left:4.17%;
        width:200px;
        text-align: left;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Caseinfo-OperationAffected-textarea{
        position: absolute;
        top: 857px;
        left:4.17%;
        width:1100px;
        height:60px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        overflow: hidden;
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        padding-left: 12px;
        resize: none;        
    }
    .Caseinfo-ImageUpload{
        position: absolute;
        top: 957px;
        left:4.17%;
        width:200px;
        text-align: left;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;    
    }
    .Caseinfo-ImageUploadbutton{
        position: absolute;
        top: 995px;
        left:4.17%;
        width:960px;
        height:310px;
    }

    .uploadprompt{
        position: absolute;
        top: 200px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left; 
    }

    .Caseinfo-ImageUploadbutton-br1{
        position: absolute;
        top: 38px;
        left:49%;
        width:2px;
        height:24px;
        background:rgba(217,217,217,1);
        border-radius:1px;
    }
    .Caseinfo-ImageUploadbutton-br2{
        position: absolute;
        top: 49px;
        left:38%;
        width:24px;
        height:2px;
        background:rgba(217,217,217,1);
        border-radius:1px;
    }
    .Caseinfo-Description{
        position: absolute;
        top: 299px;
        left:4.17%;
        width:200px;
        text-align: left;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;        
        text-align: left;    
    }

    .Caseinfo-Description-textarea{
        position: absolute;
        top: 337px;
        left:4.17%;    
        width: 1100px;
        height:330px;
        border:1px solid rgba(0,0,0,0.15);
        overflow-y: scroll;
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        padding-left: 12px;
        resize: none;
    }
    .Caseinfo-Next{
        position: absolute;
        top: 1333px;
        left:77.5%;
        width:220px;
        height:52px;
        background:rgba(36,157,253,1);
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        font-family: 'Noto Sans TC', sans-serif;    
    }
    .Caseinfo-Back{
        position: absolute;
        top: 1333px;
        left:4.17%;
        width:220px;
        height:52px;        
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(36,157,253,1);
        font-family: 'Noto Sans TC', sans-serif;    
    }
    .Caseinfo-Description-content{
        position: absolute;
        top: 337px;
        left:4.17%;
        width: 1100px;
        height:336px;
    }
    .editorMenu {
        background-color: #f1f1f1;
        border: 1px solid #ccc;
    }
    

    .editor{
         margin-top: -1px;
         width: 1100px;
         height:300px;
         border: 1px solid #ccc;
         border-top: none;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 460px;
    }
    .el-input__prefix {
    left: 435px;    
    }
    .el-input--prefix .el-input__inner{
        font-family: 'Noto Sans TC', sans-serif;
        padding-left: 12px;
    }
    /* .el-icon-time:before{
        content: url(../../assets/img/Datepicker.png);
        width: 15px;
        height: 15px;
        
    } */
    .el-icon-plus:before {
    content: url(../../assets/img/plus.png);
    }

    .w-e-text {
        font-family: 'Noto Sans TC', sans-serif; 
        font-size: 16px;
    }
    .avatar-uploader{
        position: absolute;
    }

    .el-upload{
       position: absolute; 
       left: 0px; 
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }

    .el-upload-list {
    margin: 0;
    padding: 0;
    position: absolute;
    list-style: none;
    width: 500px;
    top: 0px;
    height: 310px;
    left: 300px;
    overflow-y: auto;
    }

</style>