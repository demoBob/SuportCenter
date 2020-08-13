<template>
    <div class="ChooseSolution">
        <div class="ChooseSolution-br"></div>
        <div class="ChooseSolution-circle">1</div>
        <div class="ChooseSolution-circle2">2</div>
        <div class="ChooseSolution-circle3">3</div>
        <div class="ChooseSolution-circle4">4</div>

        <div class="ChooseSolution-name1">Choose Solution</div>
        <div class="ChooseSolution-name2">Case info</div>
        <div class="ChooseSolution-name3">Contact Info</div>
        <div class="ChooseSolution-name4">Submit</div>

        <div class="ChooseSolution-name5">Choose Solution</div>
        <div class="ChooseSolution-name6">Choose Solution below</div>
      <!--
        <div v-if="imgtype == 'Edusmart'">
                    <div class="ChooseSolution-photo1checked">
                        <img src="../../assets/img/Edusmartshow.png" class="ChooseSolution-photo1-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo1" @click="Edusmartcheck">
                        <img src="../../assets/img/Edusmartshow.png" class="ChooseSolution-photo1-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'DonationPlus'">
                    <div class="ChooseSolution-photo2checked">
                        <img src="../../assets/img/DonationPlus.png" class="ChooseSolution-photo2-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo2" @click="DonationPluscheck">
                        <img src="../../assets/img/DonationPlus.png" class="ChooseSolution-photo2-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'SalesPlus'">
                    <div class="ChooseSolution-photo3checked">
                        <img src="../../assets/img/SalesPlusshow.png" class="ChooseSolution-photo3-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo3" @click="SalesPluscheck">
                        <img src="../../assets/img/SalesPlusshow.png" class="ChooseSolution-photo3-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'MerchantPlus'">
                    <div class="ChooseSolution-photo4checked">
                        <img src="../../assets/img/MerchantPlusshow.png" class="ChooseSolution-photo4-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo4" @click="MerchantPluscheck">
                        <img src="../../assets/img/MerchantPlusshow.png" class="ChooseSolution-photo4-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'LoyaltyPlus'">
                    <div class="ChooseSolution-photo5checked">
                        <img src="../../assets/img/LoyaltyPlusshow .png" class="ChooseSolution-photo5-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo5" @click="LoyaltyPluscheck">
                        <img src="../../assets/img/LoyaltyPlusshow .png" class="ChooseSolution-photo5-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'PropertyPlus'">
                    <div class="ChooseSolution-photo6checked">
                        <img src="../../assets/img/PropertyPlusshow.png" class="ChooseSolution-photo6-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo6" @click="PropertyPluscheck">
                        <img src="../../assets/img/PropertyPlusshow.png" class="ChooseSolution-photo6-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'Asset'">
                    <div class="ChooseSolution-photo7checked">
                        <img src="../../assets/img/Assetshow.png" class="ChooseSolution-photo7-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo7" @click="Assetcheck">
                        <img src="../../assets/img/Assetshow.png" class="ChooseSolution-photo7-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'Office365'">
                    <div class="ChooseSolution-photo8checked">
                        <img src="../../assets/img/Office365show.png" class="ChooseSolution-photo8-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo8" @click="Office365check">
                        <img src="../../assets/img/Office365show.png" class="ChooseSolution-photo8-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'microsoft'">
                    <div class="ChooseSolution-photo9checked">
                        <img src="../../assets/img/microsoft-azure-2show.png" class="ChooseSolution-photo9-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo9" @click="microsoftcheck">
                        <img src="../../assets/img/microsoft-azure-2show.png" class="ChooseSolution-photo9-img">                        
                    </div>
        </div>

        <div v-if="imgtype == 'Others'">
                    <div class="ChooseSolution-photo10checked">
                        <img src="../../assets/img/Othersshow.png" class="ChooseSolution-photo10-img">
                        
                    </div>
        </div>
        <div v-else>
                    <div class="ChooseSolution-photo10" @click="Otherscheck">
                        <img src="../../assets/img/Othersshow.png" class="ChooseSolution-photo10-img">                        
                    </div>
        </div>
        -->
        <div class="ChooseSolution-photo">
            <ul>
              <li v-for="dates in Productdate" :key="dates.ProductId"  :class = "ischeck == dates.ProductId ? 'photocheck' : '' " @click="changecheck(dates.ProductId)" :id="dates.ProductId">
                <img :src="dates.Image" >
              </li>
            </ul>
        </div>
        
          <div class="ChooseSolution-version">
            Version
          </div>
          <input class="ChooseSolution-version-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'" v-model="ProductVersion">
        
        
       
        <div class="ChooseSolution-AffectedPlatform">
          Affected Platform
          </div>
        <el-select v-model="PlatformAffected" slot="prepend" placeholder="Please choose">
          <el-option
      v-for="item in Modulesdate"
      :key="item"
      :label="item"
      :value="item"
       class="option"></el-option>
       <!--
          <el-option label="CRM Online" value="CRMOnline" class="option"></el-option>
          <el-option label="CRM On-Premises" value="CRMOn-Premises"  class="option"></el-option>
          <el-option label="Web Application" value="WebApplication"  class="option"></el-option>
          <el-option label="Power App" value="PowerApp"  class="option"></el-option>
          <el-option label="Mobile App" value="MobileApp"  class="option"></el-option>
          <el-option label="API Service" value="APIService"  class="option"></el-option>
          <el-option label="Integration" value="Integration"  class="option"></el-option>
          <el-option label="Power BI" value="PowerBI"  class="option"></el-option>
          <el-option label="SSRS Report" value="SSRSReport"  class="option"></el-option>
          <el-option label="Others" value="Others"  class="option"></el-option>
       -->
        </el-select>
        
        <!--
          
        <input class="ChooseSolution-UserID-text" type="text" readonly="readonly">
        -->        
        <el-button class="ChooseSolution-Next" @click="ToCaseinfo">Next</el-button>                
    </div>
</template>

<script>
import mainServices from "@/services/mainServices.js"
export default {
    inject:["reload"],
    name:'ChooseSolution',    
    data(){
      return{
        ischeck:'',
        PlatformAffected: this.$store.state.PlatformAffected,
        ProductId: this.$store.state.ProductId,
        ProductVersion: this.$store.state.ProductVersion,
        Productdate: this.$store.state.Productdate,
        Modulesdate: this.$store.state.Modulesdate,
        Productsdate:[]
      }
    },mounted:function(){
       document.getElementById(this.ProductId).click()
    },methods:{       
        Edusmartcheck(){           
            this.imgtype = "Edusmart"
            
        },DonationPluscheck(){           
            this.imgtype = "DonationPlus"
            
        },SalesPluscheck(){           
            this.imgtype = "SalesPlus"
            
        },MerchantPluscheck(){           
            this.imgtype = "MerchantPlus"
            
        },LoyaltyPluscheck(){           
            this.imgtype = "LoyaltyPlus"
            
        },PropertyPluscheck(){           
            this.imgtype = "PropertyPlus"
            
        },Assetcheck(){           
            this.imgtype = "Asset"
            
        },Office365check(){           
            this.imgtype = "Office365"
            
        },microsoftcheck(){           
            this.imgtype = "microsoft"
            
        },Otherscheck(){           
            this.imgtype = "Others"
            
        },ToCaseinfo(){
          if(this.ProductId == "" || this.PlatformAffected == ""){
             this.$alert("Please select \"Solution\" and \"Affected Platform\"!", 'Message', {
                                confirmButtonText: 'OK'
                                });
          }else{
            const solution = {
               ProductId : this.ProductId,
               PlatformAffected : this.PlatformAffected,
               ProductVersion : this.ProductVersion
            }
            this.$store.commit('ChooseSolution',solution)
            this.GLOBAL.type = "CreateTicket"          
            this.GLOBAL.num = '2'
            this.reload()
          }                     
        },
        changecheck(ProductId){
          this.ischeck = ProductId
          this.ProductId = ProductId
        }
    }
}
</script>
<style src="../../components/css/ChooseSolution.css">
    @import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);  
</style>