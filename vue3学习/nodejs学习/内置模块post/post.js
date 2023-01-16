const http=require('http')
const https=require('https')
const url =require('url')

http.createServer((req,res)=>{
    const urlObj=url.parse(req.url,true)
    res.writeHead(200,{
        "content-type":"application/json;charset=utf-8",
        "access-control-allow-origin":"*"
    })
    switch(urlObj.pathname){
        case "/api/xiepeng":
            httpPost((data)=>{
                res.end(data)
            })
            break
        default:
            res.end('404 not found');
    }
}).listen(3000,()=>{
    console.log('server start')
})
function httpPost(cb){
    const option={
        hostname:"m.xiaomiyoupin.com",
        path:"/mtop/market/search/placeHolder",
        prot:"443",
        method:'post',
        headers:{
            "content-type":"application/json;charset=utf-8",
        }
    }
    let data=''
    const requset=https.request(option,(res)=>{
        res.on("data",(chunk)=>{
            data+=chunk
        })
        res.on("end",()=>{
            cb(data)
        })
    })
    requset.write(JSON.stringify([{},{"baseParam":{"ypClient":1}}]))
    requset.end()
}