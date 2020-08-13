import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
    state:{
        //Login
        Username:"",
        Password:"",
        IsManager:false,
        ContactPersons:"",
        ContactEmails:"",
        ContactCompanyNames:"",
        ContactNumbers:"",
        loginstatus:false,

        //CreateTicket
        ProductId:"",
        ProductVersion:"",
        PlatformAffected:"",
        CaseTitle:"",
        IssueDate:"",
        Severity:"",
        OperationAffected:"",
        files:[],        
        ImageUrl:[],
        Description:"",
        ContactPerson:"",
        ContactEmail:"",
        ContactCompanyName:"",
        ContactNumber:"",
        PreferredContactMethods:"Email",
        CaseNumber:"",

        //MyAcount
        FirstName:"",
        LastName:"",
        EmailAddress:"",
        PreferredContactMethod:"",
        BusinessPhone:"",
        MobilePhone:"",
        CompanyName:"",
        CompanyAddress:"",
        SupportEffectivePeriodFrom:"",
        SupportEffectivePeriodTo:"",
        ContractStatus:"",
        Entitlement:"",
        ConsultingTokenIncluded:"",
        Remaining:"",

        //GetProducts
        Productdate:[],

        //GetModules
        Modulesdate:[],

        //GetCases
        openCasesdate:[],
        closeCasesdate:[],

        //GetCaseDetails
        CaseTitles:"",
        CaseNumbers:"",
        CreatedOns:"",
        ClosedOns:"",
        ProcessingTimes:0,
        IssueDates:"",
        CaseOwners:"",
        AssignedEngineers:"",
        Descriptions:"",
        Severitys:"",
        PlatformAffecteds:"",
        OperationAffecteds:"",
        CaseTypes:"",
        MicrosoftTicketNumbers:"",
        Resolutions:"",
        ProductVersions:"",
        ProductIds:"",
        Imagesdate:[],
        Status:""
    },mutations:{
        login(state,Login){
            state.Username = Login.Username,
            state.Password = Login.Password,
            state.IsManager = Login.IsManager,
            state.ContactPersons = Login.ContactPerson,
            state.ContactEmails = Login.ContactEmail,
            state.ContactCompanyNames = Login.ContactCompanyName,
            state.ContactNumbers = Login.ContactNumber,
            state.loginstatus = Login.loginstatus           
        },
        GetAccount(state,Account){
            state.FirstName = Account.FirstName,
            state.LastName = Account.LastName,
            state.EmailAddress = Account.EmailAddress,
            state.PreferredContactMethod = Account.PreferredContactMethod,
            state.BusinessPhone = Account.BusinessPhone,
            state.MobilePhone = Account.MobilePhone,
            state.CompanyName = Account.CompanyName,
            state.CompanyAddress = Account.CompanyAddress,
            state.SupportEffectivePeriodFrom = Account.SupportEffectivePeriodFrom,
            state.SupportEffectivePeriodTo = Account.SupportEffectivePeriodTo,
            state.ContractStatus = Account.ContractStatus,
            state.Entitlement = Account.Entitlement,
            state.ConsultingTokenIncluded = Account.ConsultingTokenIncluded,
            state.Remaining = Account.Remaining
        },
        ChooseSolution(state,solution){
            state.ProductId = solution.ProductId,
            state.ProductVersion = solution.ProductVersion,
            state.PlatformAffected = solution.PlatformAffected
        },
        Caseinfo(state,caseinfo){
            state.CaseTitle = caseinfo.CaseTitle,
            state.IssueDate = caseinfo.IssueDate,
            state.Severity = caseinfo.Severity,
            state.OperationAffected = caseinfo.OperationAffected,
            state.files = caseinfo.files,
            state.Description = caseinfo.Description
        },
        ContactInfo(state,contactInfo){
            state.ContactPerson = contactInfo.ContactPerson,
            state.ContactEmail = contactInfo.ContactEmail,
            state.ContactCompanyName = contactInfo.ContactCompanyName,
            state.ContactNumber = contactInfo.ContactNumber,
            state.PreferredContactMethods = contactInfo.PreferredContactMethods
        },
        GetProduct(state,product){
            state.Productdate = product.Productdate
        },
        GetModules(state,Modules){
            state.Modulesdate = Modules
        },
        GetCases(state,Casesdate){
            state.openCasesdate = Casesdate.openCasesdate,
            state.closeCasesdate = Casesdate.closeCasesdate
        },
        GetCaseDetails(state,CaseDetails){
            state.CaseTitles = CaseDetails.CaseTitles,
            state.CaseNumbers = CaseDetails.CaseNumbers,
            state.CreatedOns = CaseDetails.CreatedOns,
            state.ClosedOns = CaseDetails.ClosedOns,
            state.ProcessingTimes = CaseDetails.ProcessingTimes,
            state.IssueDates = CaseDetails.IssueDates,
            state.CaseOwners = CaseDetails.CaseOwners,
            state.AssignedEngineers = CaseDetails.AssignedEngineers,
            state.Descriptions = CaseDetails.Descriptions,
            state.Severitys = CaseDetails.Severitys,
            state.PlatformAffecteds = CaseDetails.PlatformAffecteds,
            state.OperationAffecteds = CaseDetails.OperationAffecteds,
            state.CaseTypes = CaseDetails.CaseTypes,
            state.MicrosoftTicketNumbers = CaseDetails.MicrosoftTicketNumbers,
            state.Resolutions = CaseDetails.Resolutions,
            state.ProductVersions = CaseDetails.ProductVersions,
            state.ProductIds = CaseDetails.ProductIds,
            state.Imagesdate = CaseDetails.Imagesdate,
            state.Status = CaseDetails.Status
        },
        clear(state){
            state.ProductId="",
            state.ProductVersion="",
            state.PlatformAffected="",
            state.CaseTitle="",
            state.IssueDate="",
            state.Severity="",
            state.OperationAffected="",
            state.ImageUrl=[],
            state.files=[],
            state.Description="",
            state.ContactPerson="",
            state.ContactEmail="",
            state.ContactCompanyName="",
            state.ContactNumber="",
            state.PreferredContactMethods="Email"
        },
        clearimg(state){
            state.files=[]
        },
        CreateTicket(state,CaseNumber){
            state.CaseNumber = CaseNumber
        }
    },actions:{

    },getters:{
        
    },modules:{
        
    }
})

//3.导出store对象
export default store