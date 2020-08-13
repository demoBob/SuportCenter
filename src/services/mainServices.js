import apiHelper from '@/utils/apiHelper'

const SupportLogin = (username,password) => {
    const requestData ={
      username,
      password
    }
    return apiHelper.post(apiHelper.apiServers.baseurl, '/Login',requestData)
  }

const GetAccountDetails = (username) => {
    const requestData ={
      username
    }
    return apiHelper.post(apiHelper.apiServers.baseurl, '/GetAccountDetails',requestData)
  }

const GetProducts = () => {
   
    return apiHelper.post(apiHelper.apiServers.baseurl, '/GetProducts')
}

const GetModules = () => {
   
  return apiHelper.post(apiHelper.apiServers.baseurl, '/GetModules')
}

const CreateTicket = (requestData) => {
  return apiHelper.post(apiHelper.apiServers.baseurl, '/CreateTicket',requestData)
}

const GetCases = (username,IsManager) => {
  const requestData ={
    username,
    IsManager
  }
  return apiHelper.post(apiHelper.apiServers.baseurl, '/GetCases',requestData)
}

const GetCaseDetails = (CaseNumber) => {
  const requestData ={
    CaseNumber
  }
  return apiHelper.post(apiHelper.apiServers.baseurl, '/GetCaseDetails',requestData)
}

const ChangePassword = (username,CurrentPassword,NewPassword) => {
  const requestData ={
    username,
    CurrentPassword,
    NewPassword
  }
  return apiHelper.post(apiHelper.apiServers.baseurl, '/ChangePassword',requestData)
}

const ForgotPassword = (username,Email) => {
  const requestData ={
    username,
    Email
  }
  return apiHelper.post(apiHelper.apiServers.baseurl, '/ForgotPassword',requestData)
}

  export default {
    SupportLogin,
    GetAccountDetails,
    GetProducts,
    CreateTicket,
    GetCases,
    GetCaseDetails,
    GetModules,
    ChangePassword,
    ForgotPassword
  }