<template>
   <div class="ContactInfo">
       <div class="ContactInfo-br"></div>
        <div class="ContactInfo-br2"></div>

        <div class="ContactInfo-circle">1</div>
        <div class="ContactInfo-circle2">2</div>
        <div class="ContactInfo-circle3">3</div>
        <div class="ContactInfo-circle4">4</div>

        <div class="ContactInfo-name1">Choose Solution</div>
        <div class="ContactInfo-name2">Case info</div>
        <div class="ContactInfo-name3">Contact Info</div>
        <div class="ContactInfo-name4">Submit</div>

        <div class="ContactInfo-infoname">Contact Info</div>

        <div class="ContactInfo-ContactPerson">
          Contact Person
        </div>
        <input class="ContactInfo-ContactEmail-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'"  v-model="ContactEmail">
        <div class="ContactInfo-ContactEmail">
          Contact Email
        </div>
        <input class="ContactInfo-CompanyName-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'"  v-model="ContactCompanyName">
        <div class="ContactInfo-CompanyName">
          Company Name
        </div>
        <input class="ContactInfo-ContactNumber-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'"  v-model="ContactNumber">
        <div class="ContactInfo-ContactNumber">
          Contact Number
        </div>
        <input class="ContactInfo-ContactPerson-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'"  v-model="ContactPerson">
        <div class="ContactInfo-PreferredContactMethod">
          Preferred Contact Method
        </div>

        <div v-if="ContacMethod == 'Any'">
            <div class="Caseinfo-Anycheck">
                <div class="Caseinfo-Any-imgcheck">
                  <img src="../../assets/img/Any.png">
                </div>
                <div class="Caseinfo-Any-namecheck">Any</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-Any" @click="ToAny">
                <div class="Caseinfo-Any-img">
                  <img src="../../assets/img/Anyshow.png">
                </div>
                <div class="Caseinfo-Any-name">Any</div>
            </div>
        </div>
        <div v-if="ContacMethod == 'Email'">
            <div class="Caseinfo-Emailcheck">
                <div class="Caseinfo-Email-imgcheck">
                  <img src="../../assets/img/Emailcheck.png">
                </div>
                <div class="Caseinfo-Email-namecheck">Email</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-Email" @click="ToEmail">
                <div class="Caseinfo-Email-img">
                  <img src="../../assets/img/Email.png">
                </div>
                <div class="Caseinfo-Email-name">Email</div>
            </div>
        </div>
        <div v-if="ContacMethod == 'Phone'">
            <div class="Caseinfo-Phonecheck">
                <div class="Caseinfo-Phone-imgcheck">
                  <img src="../../assets/img/Phonecheck.png">
                </div>
                <div class="Caseinfo-Phone-namecheck">Phone</div>
            </div>
        </div>
        <div v-else>
            <div class="Caseinfo-Phone" @click="ToPhone">
                <div class="Caseinfo-Phone-img">
                  <img src="../../assets/img/Phone.png">
                </div>
                <div class="Caseinfo-Phone-name">Phone</div>
            </div>
        </div>

        <el-button class="ContactInfo-Next" @click="ToSubmit">Submit</el-button>
        <el-button class="ContactInfo-Back" @click="ToCaseinfo">Back</el-button>
   </div> 
</template>
<script>
import mainServices from "@/services/mainServices.js" 
export default {
    inject:["reload"],
    name:'ContactInfo',
    data(){
        return{
            ContacMethod:this.$store.state.PreferredContactMethods,
            ContactPerson:"",
            ContactEmail:"",
            ContactCompanyName:"",
            ContactNumber:"",
            username:""
        }        
    },
    methods:{
        ToText(HTML)
              {
                var input = HTML;
                return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
              },
        ToCaseinfo(){
            this.$store.commit('clearimg')
            this.GLOBAL.num = '2'
            this.reload()
        },ToAny(){
            this.ContacMethod = "Any"            
        },ToEmail(){
           this.ContacMethod = "Email"  
        },ToPhone(){
            this.ContacMethod = "Phone"  
        },ToSubmit(){
        const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });          
            const contactInfo = {
               ContactPerson : this.ContactPerson,
               ContactEmail : this.ContactEmail,
               ContactCompanyName : this.ContactCompanyName,
               ContactNumber : this.ContactNumber,
               PreferredContactMethods : this.ContacMethod
            }
            this.$store.commit('ContactInfo',contactInfo)
            const requestData = {
                username:this.username,
                ProductId:this.$store.state.ProductId,
                ProductVersion:this.$store.state.ProductVersion,
                PlatformAffected:this.$store.state.PlatformAffected,
                CaseTitle:this.$store.state.CaseTitle,
                IssueDate:this.$store.state.IssueDate,
                Severity:this.$store.state.Severity,
                OperationAffected:this.$store.state.OperationAffected,
                files:this.$store.state.files,                
                Description:this.$store.state.Description,
                ContactPerson:this.$store.state.ContactPerson,
                ContactEmail:this.$store.state.ContactEmail,
                ContactCompanyName:this.$store.state.ContactCompanyName,
                ContactNumber:this.$store.state.ContactNumber,
                PreferredContactMethod:this.$store.state.PreferredContactMethods
            }
            mainServices.CreateTicket(requestData)
            .then(Response =>{
              if(Response.isSuccess == true){
                this.$store.commit('CreateTicket',Response.data.CaseNumber)
                loading.close();
                console.log(Response.data);
                this.GLOBAL.type = "CreateTicket"
                this.GLOBAL.num = '4'
                this.$store.commit('clear')
                this.reload()
              }else{
                loading.close();
                //alert("You can't add a product family, a draft product, or a draft bundle.");
                this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
                
              }
              
            })
            .catch(error =>{
              console.log(error);
              this.$alert('Create Ticket failed, please try again', 'Message', {
                                confirmButtonText: 'OK'
                                });
              loading.close();
            })
        }
    },created(){
       this.ContactPerson = sessionStorage.getItem('ContactPerson');
       this.ContactEmail = sessionStorage.getItem('ContactEmail');
       this.ContactCompanyName = sessionStorage.getItem('ContactCompanyName');
       this.ContactNumber = sessionStorage.getItem('ContactNumber');
       this.username = sessionStorage.getItem('username');
    }
}
</script>
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .ContactInfo{
        position: absolute;
        width:1200px;
        height: 760px;
    }
    .ContactInfo-br{
        position: absolute;
        top:45px;
        left: 29.67%;
        width:357px;
        height:2px;
        background:rgba(36,157,253,1);
    }
    .ContactInfo-br2{
        position: absolute;
        top:45px;
        left: 60.67%;
        width:170px;
        height:2px;
        background:rgba(239,239,239,1);
    }

    .ContactInfo-circle{
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
    .ContactInfo-circle2{
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
    .ContactInfo-circle3{
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
    .ContactInfo-circle4{
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
    .ContactInfo-name1{
      position: absolute;
      top: 72px;
      left:23.42%;
      width:180px;
      height:24px;
      font-size:14px;
      font-weight:500;
      color:rgba(36,157,253,1);
      line-height:24px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;    
    }
    .ContactInfo-name2{
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
    .ContactInfo-name3{
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
    .ContactInfo-name4{
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
      text-align: left;    
    }
    .ContactInfo-infoname{
        position: absolute;
        top: 134px;
        left:4.17%;
        width:200px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif; 
        text-align: left;   
    }

    .ContactInfo-ContactPerson{
      position: absolute;
      top: 187px;
      left:4.17%;
      width:200px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif;
      text-align: left;    
    }
    .ContactInfo-ContactPerson-text{
      position: absolute;
      top: 225px;
      left:4.17%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      border:1px solid rgba(0,0,0,0.15);
      font-family: 'Noto Sans TC', sans-serif;
      padding-left: 12px;    
    }
    .ContactInfo ::-webkit-input-placeholder{
      position: relative;      
      left:2.6%;
      width:81px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(0,0,0,0.25);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif;    
    }

    .ContactInfo-ContactEmail{
      position: absolute;
      top: 187px;
      left:57.5%;
      width:200px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif; 
      text-align: left;   
    }
    .ContactInfo-ContactEmail-text{
      position: absolute;
      top: 225px;
      left:57.5%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      border:1px solid rgba(0,0,0,0.15);
      font-family: 'Noto Sans TC', sans-serif;
      padding-left: 12px;    
    }
    .ContactInfo-CompanyName{
      position: absolute;
      top: 307px;
      left:4.17%;
      width:200px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif; 
      text-align: left;   
    }
    .ContactInfo-CompanyName-text{
      position: absolute;
      top: 345px;
      left:4.17%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      border:1px solid rgba(0,0,0,0.15);
      font-family: 'Noto Sans TC', sans-serif;
      padding-left: 12px;    
    }
    .ContactInfo-ContactNumber{
      position: absolute;
      top: 307px;
      left:57.5%;
      width:200px;
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      font-family: 'Noto Sans TC', sans-serif; 
      text-align: left;   
    }
    .ContactInfo-ContactNumber-text{
      position: absolute;
      top: 345px;
      left:57.5%;
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:16px;
      border:1px solid rgba(0,0,0,0.15);
      font-family: 'Noto Sans TC', sans-serif;
      padding-left: 12px;    
    }
    .ContactInfo-PreferredContactMethod{
        position: absolute;
        top: 427px;
        left:4.17%;
        width:400px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif; 
        text-align: left;   
    }
    .ContactInfo-Next{
      position: absolute;
      top: 664px;
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
    .ContactInfo-Back{
        position: absolute;
        top: 659px;
        left:4.17%;
        width:220px;
        height:52px;        
        border-radius:4px;
        font-size:18px;
        font-weight:400;
        color:rgba(36,157,253,1);
        font-family: 'Noto Sans TC', sans-serif;    
    }
    .Caseinfo-Any{
        position: absolute;
        top: 459px;
        left:4.17%;
        width:200px;
        height:110px;
        background:rgba(248,248,248,1);
        border-radius:4px;
        cursor: pointer;
    }
    .Caseinfo-Any-img{
        position: absolute;
        top: 25px;
        left:31%;
        width:76px;
        height:29px;        
    }

    .Caseinfo-Any-img img{
        width:76px;
        height:29px;        
    }

    .Caseinfo-Any-name{
        position: absolute;
        top: 63px;
        left:43%;
        width:28px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(217,217,217,1);
        line-height:22px;  
        font-family: 'Noto Sans TC', sans-serif;          
    }
    .Caseinfo-Anycheck{
        position: absolute;
        top: 459px;
        left:4.17%;
        width:200px;
        height:110px;
        background:rgba(36,157,253,1);
        border-radius:4px;
    }
    .Caseinfo-Any-imgcheck{
        position: absolute;
        top: 25px;
        left:31%;
        width:76px;
        height:29px;      
    }

    .Caseinfo-Any-imgcheck img{
        width:76px;
        height:29px;      
    }

    .Caseinfo-Any-namecheck{
        position: absolute;
        top: 63px;
        left:43%;
        width:28px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:22px;  
        font-family: 'Noto Sans TC', sans-serif;          
    }  
      
    .Caseinfo-Email{
        position: absolute;
        top: 459px;
        left:23.33%;
        width:200px;
        height:110px;
        background:rgba(248,248,248,1);
        border-radius:4px;
        cursor: pointer;
    }
    .Caseinfo-Email-img{
        position: absolute;
        top: 26px;
        left:42%;
        width:32px;
        height:27px;      
    }

    .Caseinfo-Email-img img{
        width:32px;
        height:27px;       
    }

    .Caseinfo-Email-name{
        position: absolute;
        top: 62px;
        left:40%;
        width:41px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(217,217,217,1);
        line-height:22px;
        font-family: 'Noto Sans TC', sans-serif;            
    }
    .Caseinfo-Emailcheck{
        position: absolute;
        top: 459px;
        left:23.33%;
        width:200px;
        height:110px;
        background:rgba(36,157,253,1);
        border-radius:4px;
    }   
    .Caseinfo-Email-namecheck{
        position: absolute;
        top: 62px;
        left:40%;
        width:41px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:22px;  
        font-family: 'Noto Sans TC', sans-serif;          
    }
    .Caseinfo-Email-imgcheck{
        position: absolute;
        top: 26px;
        left:42%;
        width:32px;
        height:27px;        
    }

    .Caseinfo-Email-imgcheck img{
        width:32px;
        height:27px;       
    }

    .Caseinfo-Phone{
        position: absolute;
        top: 459px;
        left:42.5%;
        width:200px;
        height:110px;
        background:rgba(248,248,248,1);
        border-radius:4px;
        cursor: pointer;
    }
    .Caseinfo-Phone-img{
        position: absolute;
        top: 25px;
        left:43.5%;
        width:28px;
        height:29px;      
    }

    .Caseinfo-Phone-img img{
        width:28px;
        height:29px;     
    }

    .Caseinfo-Phone-name{
        position: absolute;
        top: 63px;
        left:38.5%;
        width:47px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(217,217,217,1);
        line-height:22px; 
        font-family: 'Noto Sans TC', sans-serif;           
    }
    .Caseinfo-Phonecheck{
        position: absolute;
        top: 459px;
        left:42.5%;
        width:200px;
        height:110px;
        background:rgba(36,157,253,1);
        border-radius:4px;
    }   
    .Caseinfo-Phone-namecheck{
        position: absolute;
        top: 63px;
        left:38.5%;
        width:47px;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:22px;  
        font-family: 'Noto Sans TC', sans-serif;          
    }
    .Caseinfo-Phone-imgcheck{
        position: absolute;
        top: 25px;
        left:43.5%;
        width:28px;
        height:28px;     
    }

    .Caseinfo-Phone-imgcheck img{
        width:28px;
        height:29px;     
    }  
</style>
