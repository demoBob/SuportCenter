<template>
    <div id="Feedbackdetailsopen">
    <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible">
        
        <div class="Feedbackdetailsopen-Openname">Open Case Details</div>
        <!--
            <div class="Feedbackdetailsopen-Openname2">（X% of Completion）</div>
        -->
        
        <div class="Feedbackdetailsopen-CaseTitle">Case Title</div>
        <el-tooltip  effect="light" :content="this.$store.state.CaseTitles" placement="bottom-start">
            <input class="Feedbackdetailsopen-CaseTitle-text" type="text" readonly="readonly" v-model="this.$store.state.CaseTitles">
        </el-tooltip>        
        <div class="Feedbackdetailsopen-CreateOn">Created On</div>
        <input class="Feedbackdetailsopen-CreateOn-text" type="text" readonly="readonly" v-model="this.$store.state.CreatedOns">
        
        <div class="Feedbackdetailsopen-Issuedate">Issue Date</div>
        <input class="Feedbackdetailsopen-Issuedate-text" type="text" readonly="readonly" v-model="this.$store.state.IssueDates">

        <div class="Feedbackdetailsopen-Description">Description</div>

        <textarea rows="5" cols="40" class="Feedbackdetailsopen-Description-textarea"  type="text" readonly="readonly" v-model="this.$store.state.Descriptions">
            <!-- <span v-html="this.$store.state.Descriptions"></span> -->
        </textarea>
        

        <div class="Feedbackdetailsopen-Solution">Image Uploaded</div>
        <div class="Feedbackdetailsopen-SolutionCenter">
            <div class="Feedbackdetailsopen-Solution-img">
            <ul>
              <li v-for="dates in Imagesdate" :key="dates.ImageName" @click="imagecheck(dates.Image)">
                <img :src="dates.Image" >
              </li>
            </ul>
        </div>

        <div class="Feedbackdetailsopen-Solution-file">
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
        


        <div class="Feedbackdetailsopen-Severity">Severity</div>
        <input class="Feedbackdetailsopen-Severity-text" type="text" readonly="readonly" v-model="this.$store.state.Severitys">

        <div class="Feedbackdetailsopen-CaseType">Case Type</div>
        <input class="Feedbackdetailsopen-CaseType-text" type="text" readonly="readonly" v-model="this.$store.state.CaseTypes">

        <div class="Feedbackdetailsopen-Version">Version</div>
        <input class="Feedbackdetailsopen-Version-text" type="text" readonly="readonly" v-model="this.$store.state.ProductVersions">

        <div class="Feedbackdetailsopen-CaseNumber">Case Number</div>
        <input class="Feedbackdetailsopen-CaseNumber-text" type="text" readonly="readonly" v-model="this.$store.state.CaseNumbers">
       
        <div class="Feedbackdetailsopen-Status">Status</div>
        <input class="Feedbackdetailsopen-Status-text" type="text" readonly="readonly" v-model="this.$store.state.Status">
        
       

        <div class="Feedbackdetailsopen-Days">Processing Time (Calendar days)</div>
        <input class="Feedbackdetailsopen-Days-text" type="text" readonly="readonly" v-model="this.$store.state.ProcessingTimes">

        <div class="Feedbackdetailsopen-OperationAffected">Operation Affected</div>
        <textarea rows="2" cols="20" class="Feedbackdetailsopen-OperationAffected-text" type="text" readonly="readonly" v-model="this.$store.state.OperationAffecteds"></textarea>

        <div class="Feedbackdetailsopen-Microsoft">Microsoft Ticket No.(if any)</div>
        <input class="Feedbackdetailsopen-Microsoft-text" type="text" readonly="readonly" v-model="this.$store.state.MicrosoftTicketNumbers">

        <div class="Feedbackdetailsopen-AffectedPlatform">Affected Platform</div>
        <input class="Feedbackdetailsopen-AffectedPlatform-text" type="text" readonly="readonly" v-model="this.$store.state.PlatformAffecteds">

        <div class="Feedbackdetailsopen-CaseOwner">Case Owner</div>
        <input class="Feedbackdetailsopen-CaseOwner-text" type="text" readonly="readonly" v-model="this.$store.state.CaseOwners">

        <div class="Feedbackdetailsopen-AssignedEngineer">Assigned Engineer</div>
        <input class="Feedbackdetailsopen-AssignedEngineer-text" type="text" readonly="readonly" v-model="this.$store.state.AssignedEngineers">

        <el-button class="Feedbackdetailsopen-Close" @click="ToMyTicket">Close</el-button>

        <ImageUploaded v-if="ImageUploadedVisible" ref="toImageUploaded"></ImageUploaded>
    
    </el-dialog>
    </div>   
</template>
<script>
import moment from 'moment'
import ImageUploaded from '@/components/commom/ImageUploaded'
export default {
    name:"MyTicket",
    components:{
        ImageUploaded
    },
    data(){
        return {
            visible:false,
            Imagesdate:[],
            filedate:[],
            IssueDate:this.$store.state.IssueDates,
            CreatedOn:this.$store.state.CreatedOns,
            Description:this.$store.state.Descriptions,
            ImageUploadedVisible:false
        }
    },
    methods:{
        init(Imagesdate,filedate){
            this.visible = true
            this.$nextTick(() =>{
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
    computed: {
        openIssuedate(){
            return moment(this.$store.state.IssueDates).format("YYYY-MM-DD HH:mm");
        },
        openCreatedon(){
            return moment(this.$store.state.CreatedOns).format("YYYY-MM-DD HH:mm");
        }
    },created(){
        this.Description = this.$store.state.Descriptions
    }

}
</script>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Feedbackdetailsopen{
        position: absolute;
        width:1100px;
        height:1430px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    }
    .Feedbackdetailsopen-Openname{
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
    .Feedbackdetailsopen-Openname2{
        position: absolute;
        top: 40px;
        left: 22.64%;
        width:260px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(255, 0, 0, 1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .Feedbackdetailsopen-CaseTitle{
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
    .Feedbackdetailsopen-CaseTitle-text{
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
    
    .Feedbackdetailsopen-CreateOn{
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
    .Feedbackdetailsopen-CreateOn-text{
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

    .Feedbackdetailsopen-Issuedate{
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
    .Feedbackdetailsopen-Issuedate-text{
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

    .Feedbackdetailsopen-Severity{
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
    .Feedbackdetailsopen-Severity-text{
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

    .Feedbackdetailsopen-CaseType{
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
    .Feedbackdetailsopen-CaseType-text{
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

    .Feedbackdetailsopen-Version{
        position: absolute;
        top: 1224px;
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
    .Feedbackdetailsopen-Version-text{
        position: absolute;
        top: 1262px;
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

    .Feedbackdetailsopen-CaseNumber{
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
    .Feedbackdetailsopen-CaseNumber-text{
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

    .Feedbackdetailsopen-Status{
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
    .Feedbackdetailsopen-Status-text{
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

    .Feedbackdetailsopen-Days{
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
    .Feedbackdetailsopen-Days-text{
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

    .Feedbackdetailsopen-OperationAffected{
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
    .Feedbackdetailsopen-OperationAffected-text{
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

    .Feedbackdetailsopen-Microsoft{
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
    .Feedbackdetailsopen-Microsoft-text{
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

    .Feedbackdetailsopen-AffectedPlatform{
        position: absolute;
        top: 1224px;
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
    .Feedbackdetailsopen-AffectedPlatform-text{
        position: absolute;
        top: 1262px;
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
    .Feedbackdetailsopen-Description{
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

    .Feedbackdetailsopen-Description-textarea{
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
        text-align:left;
        overflow: auto;
    }

    .Feedbackdetailsopen-Resolution{
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

    .Feedbackdetailsopen-Resolution-textarea{
        position: absolute;
        top: 894px;
        left: 2.73%;
        width:1040px;
        height:140px;
        background:rgba(241,241,241,1);
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        resize: none;
    }

    .Feedbackdetailsopen-Solution{
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

    .Feedbackdetailsopen-SolutionCenter{
        position: absolute;
        top: 1004px;
        left: 2.73%;
        width:1000px;
        height:210px;
        overflow: auto;
    }

    .Feedbackdetailsopen-Solution-img{
        position: relative; 
        float: left;              
    }

    .Feedbackdetailsopen-Solution-img ul li{        
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

    .Feedbackdetailsopen-Solution-img ul li img{
        width:245px;
        height:175px;       
    }

    .Feedbackdetailsopen-Solution-file{
        position: relative;
        float: left;
    }

    .Feedbackdetailsopen-Solution-file ul li{        
        width:250px;
        height:180px;
        border-radius:6px;
        border:2px solid rgba(0,126,227,0.2);
        list-style: none;
        float: left;
        margin-left: 50px;
        margin-top: 20px;
    }

    .Feedbackdetailsopen-Solution-file ul li img{
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

    .Feedbackdetailsopen-CaseOwner{
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
    .Feedbackdetailsopen-CaseOwner-text{
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

    .Feedbackdetailsopen-AssignedEngineer{
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
    .Feedbackdetailsopen-AssignedEngineer-text{
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

    .Feedbackdetailsopen-Close{
        position: absolute;
        top: 1354px;
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
    
    #Feedbackdetailsopen .el-dialog{
        margin: 0px;
        left: 400px;
        position: absolute;
        width:1100px;
        height:1430px;
        background:rgba(255,255,255,1);
        border-radius:6px;
    } 
</style>
