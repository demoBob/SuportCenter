<template>
    <div id="Feedbackdetails">
    <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible">
        
        <div class="Feedbackdetails-Closedname">Closed Case Details</div>

        <div class="Feedbackdetails-CaseTitle">Case Title</div>
        <!-- <el-popover
            ref="popover1"
            placement="right-start"           
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover> -->
         <el-tooltip  effect="light" :content="this.$store.state.CaseTitles" placement="bottom-start">
             <input class="Feedbackdetails-CaseTitle-text" type="text" readonly="readonly" v-model="this.$store.state.CaseTitles">
        </el-tooltip>
        

        <div class="Feedbackdetails-CreateOn">Created On</div>
        <input class="Feedbackdetails-CreateOn-text" type="text" readonly="readonly" v-model="this.$store.state.CreatedOns">

        <div class="Feedbackdetails-Issuedate">Issue Date</div>
        <input class="Feedbackdetails-Issuedate-text" type="text" readonly="readonly" v-model="this.$store.state.IssueDates">

        <div class="Feedbackdetails-Description">Description</div>
        <textarea rows="5" cols="40" class="Feedbackdetails-Description-textarea"  type="text" readonly="readonly" v-model="this.$store.state.Descriptions">
            <!-- <span v-html="this.$store.state.Descriptions"></span> -->
        </textarea>

        <div class="Feedbackdetails-Resolution">Resolution</div>
        <textarea rows="5" cols="40" class="Feedbackdetails-Resolution-textarea"  type="text" readonly="readonly" v-model="this.$store.state.Resolutions">
            
        </textarea>

        <div class="Feedbackdetails-Solution">Image Uploaded</div>
        <div class="Feedbackdetails-SolutionCenter">
            <div class="Feedbackdetails-Solution-img">
            <ul>
              <li v-for="dates in Imagesdate" :key="dates.ImageName" @click="imagecheck(dates.Image)">
                <img :src="dates.Image" >
              </li>
            </ul>
        </div>

        <div class="Feedbackdetails-Solution-file">
            <ul>
              <li v-for="dates in filedate" :key="dates.FileName">
                <div class="filecenter">
                    <img :src="dates.File" >
                <el-tooltip  effect="light" :content="dates.FileName" placement="bottom-start">
                    <div class="filename">{{dates.FileName}}</div>
                </el-tooltip>
                </div>               
              </li>
            </ul>
        </div>
        </div>

        <div class="Feedbackdetails-Severity">Severity</div>
        <input class="Feedbackdetails-Severity-text" type="text" readonly="readonly" v-model="this.$store.state.Severitys">

        <div class="Feedbackdetails-CaseType">Case Type</div>
        <input class="Feedbackdetails-CaseType-text" type="text" readonly="readonly" v-model="this.$store.state.CaseTypes">

        <div class="Feedbackdetails-Version">Version</div>
        <input class="Feedbackdetails-Version-text" type="text" readonly="readonly" v-model="this.$store.state.ProductVersions">

        <div class="Feedbackdetails-CaseNumber">Case Number</div>
        <input class="Feedbackdetails-CaseNumber-text" type="text" readonly="readonly" v-model="this.$store.state.CaseNumbers">

        <div class="Feedbackdetails-ClosedOn">Closed On</div>
        <input class="Feedbackdetails-ClosedOn-text" type="text" readonly="readonly" v-model="this.$store.state.ClosedOns">
        

        <div class="Feedbackdetails-Days">Processing Time (Calendar days)</div>
        <input class="Feedbackdetails-Days-text" type="text" readonly="readonly" v-model="this.$store.state.ProcessingTimes">

        <div class="Feedbackdetails-OperationAffected">Operation Affected</div>
        <textarea class="Feedbackdetails-OperationAffected-text" type="text" readonly="readonly" v-model="this.$store.state.OperationAffecteds"></textarea>

        <div class="Feedbackdetails-Microsoft">Microsoft Ticket No.(if any)</div>
        <input class="Feedbackdetails-Microsoft-text" type="text" readonly="readonly" v-model="this.$store.state.MicrosoftTicketNumbers">

        <div class="Feedbackdetails-AffectedPlatform">Affected Platform </div>
        <input class="Feedbackdetails-AffectedPlatform-text" type="text" readonly="readonly" v-model="this.$store.state.PlatformAffecteds">

        <div class="Feedbackdetails-CaseOwner">Case Owner</div>
        <input class="Feedbackdetails-CaseOwner-text" type="text" readonly="readonly" v-model="this.$store.state.CaseOwners">

        <div class="Feedbackdetails-AssignedEngineer">Assigned Engineer</div>
        <input class="Feedbackdetails-AssignedEngineer-text" type="text" readonly="readonly" v-model="this.$store.state.AssignedEngineers">

        <el-button class="Feedbackdetails-Close" @click="ToMyTicket">Close</el-button>

        <ImageUploaded v-if="ImageUploadedVisible" ref="toImageUploaded"></ImageUploaded>
    
    </el-dialog>
    </div>   
</template>
<script>
import moment from 'moment'
import ImageUploaded from '@/components/commom/ImageUploaded'
export default {
    name:"MyTicket",
    data(){
        return {
            visible:false,
            Imagesdate:[],
            filedate:[],
            IssueDate:this.$store.state.IssueDates,
            CreateOn:this.$store.state.CreatedOns,
            ClosedOn:this.$store.state.ClosedOns,
            ImageUploadedVisible:false
        }
    },
    methods:{
        init(Imagesdate,filedate){
            this.visible = true
            this.$nextTick(() =>{
                console.log(filedate)
                this.Imagesdate = Imagesdate,
                this.filedate = filedate
            })
        },
        ToMyTicket(){
            this.visible = false
        },        
        imagecheck(Image){
            this.ImageUploadedVisible = true
            this.$nextTick(() => {
            this.$refs.toImageUploaded.init(Image)
            })
        }
    },
    components:{
       ImageUploaded
    },
    computed: {
        Issuedate(){
            return moment(this.$store.state.IssueDates).format("YYYY-MM-DD HH:mm");
        },
        Createdon(){
            return moment(this.$store.state.CreatedOns).format("YYYY-MM-DD HH:mm");
        },
        Closedon(){
            return moment(this.$store.state.ClosedOns).format("YYYY-MM-DD HH:mm");
        }
    }
}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Feedbackdetails{
        position: absolute;
        width:1100px;
        height:1628px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }
    .Feedbackdetails-Closedname{
        position: absolute;
        top: 40px;
        left: 2.73%;
        width:300px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CaseTitle{
        position: absolute;
        top: 108px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CaseTitle-text{
        position: absolute;
        top: 146px;
        left: 2.73%;
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
    
    .Feedbackdetails-CreateOn{
        position: absolute;
        top: 328px;       
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CreateOn-text{
        position: absolute;
        top: 366px;       
        left: 2.73%;
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

    .Feedbackdetails-Issuedate{
        position: absolute;
        top: 218px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-Issuedate-text{
        position: absolute;
        top: 256px;
        left: 2.73%;
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

    .Feedbackdetails-Severity{
        position: absolute;
        top: 746px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-Severity-text{
        position: absolute;
        top: 784px;
        left: 2.73%;
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

    .Feedbackdetails-CaseType{
        position: absolute;
        top: 856px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CaseType-text{
        position: absolute;
        top: 894px;
        left: 2.73%;
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

    .Feedbackdetails-Version{
        position: absolute;
        top: 1422px;
        left: 55.45%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-Version-text{
        position: absolute;
        top: 1460px;
        left: 55.45%;
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

    .Feedbackdetails-CaseNumber{
        position: absolute;
        top: 108px;
        left: 55.45%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CaseNumber-text{
        position: absolute;
        top: 146px;
        left: 55.45%;
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

    .Feedbackdetails-ClosedOn{
        position: absolute;
        top: 218px;
        left: 55.45%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-ClosedOn-text{
        position: absolute;
        top: 256px;
        left: 55.45%;
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

    .Feedbackdetails-Days{
        position: absolute;
        top: 328px;
        left: 55.45%;
        width:350px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-Days-text{
        position: absolute;
        top: 366px;
        left: 55.45%;
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

    .Feedbackdetails-OperationAffected{
        position: absolute;
        top: 746px;
        left: 55.45%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-OperationAffected-text{
        position: absolute;
        top: 784px;
        left: 55.45%;
        width:460px;
        height:40px;
        padding-left: 12px;
        padding-top: 5px;
        font-size:16px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        background:rgba(241,241,241,1);
        color:rgba(0,0,0,0.25); 
        font-family: 'Noto Sans TC', sans-serif;
        resize: none;       
    }

    .Feedbackdetails-Microsoft{
        position: absolute;
        top: 856px;
        left: 55.45%;
        width:350px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-Microsoft-text{
        position: absolute;
        top: 894px;
        left: 55.45%;
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

    .Feedbackdetails-AffectedPlatform{
        position: absolute;
        top: 1422px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-AffectedPlatform-text{
        position: absolute;
        top: 1460px;
        left: 2.73%;
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
    .Feedbackdetails-Description{
        position: absolute;
        top: 548px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Feedbackdetails-Description-textarea{
        position: absolute;
        top: 586px;
        left: 2.73%;
        width:1040px;
        height:140px;
        background:rgba(241,241,241,1);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:rgba(0,0,0,0.25);
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        resize: none;
        text-align: left;
        overflow: auto;
    }

    .Feedbackdetails-Resolution{
        position: absolute;
        top: 966px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }

    .Feedbackdetails-Resolution-textarea{
        position: absolute;
        top: 1004px;
        left: 2.73%;
        width:1040px;
        height:140px;
        background:rgba(241,241,241,1);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        color:rgba(0,0,0,0.25);
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        resize: none;
    }

    .Feedbackdetails-Solution{
        position: absolute;
        top: 1164px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
      
    .Feedbackdetails-SolutionCenter{
        position: absolute;
        top: 1202px;
        left: 2.73%;
        width:1000px;
        height:210px;
        overflow: auto;
    }

    .Feedbackdetails-Solution-img{
        position: relative; 
        float: left;              
    }

    .Feedbackdetails-Solution-img ul li{        
        width:250px;
        height:180px;
        border-radius:6px;
        border:2px solid rgba(0,126,227,0.2);
        list-style: none;
        margin-left: 50px;
        float: left;
        cursor: pointer;
        margin-top: 20px;
    }

    .Feedbackdetails-Solution-img ul li img{
        width:245px;
        height:175px;       
    }

    .Feedbackdetails-Solution-file{
        position: relative;
        float: left;
    }

    .Feedbackdetails-Solution-file ul li{        
        width:250px;
        height:180px;
        border-radius:6px;
        border:2px solid rgba(0,126,227,0.2);
        list-style: none;
        float: left;
        margin-left: 50px;
        margin-top: 20px;
    }

    .Feedbackdetails-Solution-file ul li img{
        width:180px;
        height:130px;
    }

    .filecenter{
        width:250px;
        height:180px;
        position: absolute;
    }

    .filename{
        position: absolute;
        top: 130px;
        width: 250px;
        height: 50px;
        text-align: center;
        font-size:16px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:rgba(51,51,51,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    .Feedbackdetails-CaseOwner{
        position: absolute;
        top: 438px;
        left: 2.73%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-CaseOwner-text{
        position: absolute;
        top: 476px;
        left: 2.73%;
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

    .Feedbackdetails-AssignedEngineer{
        position: absolute;
        top: 438px;
        left: 55.75%;
        width:300px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    .Feedbackdetails-AssignedEngineer-text{
        position: absolute;
        top: 476px;
        left: 55.75%;
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

    .Feedbackdetails-Close{
        position: absolute;
        top: 1552px;
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
    
    #Feedbackdetails .el-dialog{        
        margin: 0px;
        left: 400px;
        position: absolute;
        width:1100px;
        height:1628px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }
    .item{
        margin: 4px;
    }

    .el-tooltip__popper {
        font-family: 'Noto Sans TC', sans-serif;
        font-size: 16px;
    }
</style>
