import {Request} from './request'
export const http=new Request({
    baseURL:'http://119.45.133.128:8098',
    timeout:10000
})
export const fileHtpp=new Request({
    baseURL:"http://localhost:3000",
    timeout:10000
})