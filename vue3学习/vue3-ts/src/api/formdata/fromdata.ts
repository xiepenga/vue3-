import { fileHtpp, http } from "@/http/http";
import axios from "axios";


export  function  fileFormdata  (data:any) {
    return fileHtpp.post('',data)
}
export function fileUpload(data:any,onUploadPregress:any){
    return axios.post("http://localhost:3000/file",data,{
        onUploadProgress:onUploadPregress
    })
}
export function fileMerge(data:any){
    return axios.post("http://localhost:3000/file/merge",data)
}