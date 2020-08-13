import axios from 'axios'
//import constant from '@/constant'

/**
 * @description api 主機位置資訊，呼叫 api 時 baseURL 帶入 key 的字串即可
 */
const apiServers = {
    baseurl: 'https://cloudnifier-devops-webapi.azurewebsites.net/WebAPI',
  }

/**
 * @description 呼叫 api 成功處理
 * @param {object} response 呼叫 api 成功回覆的資料
 */
const successHandler = (response) => {
    if (response) {
      const { data, data: { isSuccess } } = response
      console.log(response);
      console.log(data);
      //if (data && isSuccess !== undefined) {
        // 取得呼叫 api 的相關資訊
        // const { config: { method, url, baseURL } } = response
        // let logUrl = ''
        // if (baseURL) {
        //   const re = new RegExp(baseURL, 'g')
        //   logUrl = url.replace(re, baseURL.slice(-1) === '/' ? '/' : '')
        // } else {
        //   logUrl = url
        // }
        // writeResponseLog(method, logUrl, data)
        // console.log(data.isSuccess);
        return data
      //}
    }
  }
  
  /**
   * @description 呼叫 api 錯誤處理
   * @param {object} error 呼叫 api 發生錯誤時回覆的錯誤資訊
   */
  const errorHandler = (error) => {
    const { response } = error
    console.log(`%c 💩💩💩 API發生例外錯誤 💩💩💩${((response && response.status) ? `status code [${response.status}]` : '')}`, 'color: #BB2E29; font-size: 14px; font-weight: bold;')
    return Promise.reject(error)
  }

  /**
 * @description 輸出呼叫 api 傳送給 api 的參數
 * @param {string} method 呼叫 api 的 method
 * @param {string} url api 的網址
 * @param {object} data 傳送給 api 的參數
 */
const writeReqeustLog = (method, url, data) => {
    console.log(`%c >>> [${method}]Request(${url}) >>> `, 'background-color: #7CBC9D; color: white; font-size: 14px; font-weight: bold;')
    console.log(data)
  }
  

const get = async (baseURL, url, data = {}) => {
    writeReqeustLog('get', url, data)
    //await defineHeaderAxios()
    return axios({
      method: 'get',
      baseURL,
      url,
      params: {
        ...data
      }
    })
      .then(successHandler)     
      .catch(errorHandler)     
  }

 /**
 * @description 使用 post 方式呼叫 api
 * @param {string} baseURL api 的主機 url，來源為 apiServers
 * @param {string} url api 的功能url
 * @param {object} data 傳送給 api 的參數
 */
const post = async (baseURL, url, data = {}) => {
  writeReqeustLog('post', url, data)
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    baseURL,
    url,
    data
  })
    .then(successHandler)
    .catch(errorHandler)
}

  export default {
    get,
    post,
    apiServers
  }
  