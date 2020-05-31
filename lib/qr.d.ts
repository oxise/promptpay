import { IPromptPay } from "./types/prompt-pay";
declare type ENV = 'production' | 'development';
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
export declare const PromptPay: (obj: IPromptPay, env?: ENV) => Promise<any>;
export {};
