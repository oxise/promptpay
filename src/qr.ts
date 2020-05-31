

import axios, { AxiosRequestConfig } from "axios";
import * as qs from 'query-string'
import { IPromptPay } from "./types/prompt-pay";

const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer'
}
  
type ENV  = 'production' | 'development'

/**
@param obj IPromptPay
@env 'production' | 'development
@obj {
    amount: Number,
    detail: String,
    referenceNo: Number, // เลขที่อ้างอิง เช่น 20171128001 (4 ตัวแรกเป็น ปี คศ. 2 ตัวถัดไปเป็น เดือน 2 ตัวถัดไปเป็นวันที่ 3 ตัวหลังเป็นการรันเลขตามลาดับ)
    token: String, // GBPAY Token
    webhook: String // url webhook เป็นการตอบกลับหลังจากที่ทำรายการสำเร็จ ฝั่ง Server
}
@return AxiosPromise
**/
export const PromptPay = (obj:  IPromptPay, env: ENV = 'production'): Promise<any> =>{
    let setData ={         
        amount: obj.amount,
        detail: obj.detail, 
        referenceNo: obj.referenceNo,
        token: obj.token,  
        payType: 'F',  
        backgroundUrl: obj.webhook, 
        responseUrl: obj.webhook
    }
    let url = 'https://api.gbprimepay.com/gbp/gateway/qrcode'
    if(env == 'development'){
        url = 'https://api.gbprimepay.com/gbp/gateway/qrcode'
    }
    return new Promise(async (resolve, reject) =>{
        try{
            let { data } = await axios.post(url, qs.stringify(setData), config)
            resolve({data: `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`})
        }catch(err){
            reject(err)
        }
    })
}