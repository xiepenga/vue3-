const http=require('http')
const url=require('url')
const https=require('https')
http.createServer((req,res)=>{
    const urlObj=url.parse(req.url,true)
    res.writeHead(200,{
        'content-type':'application/json;charset=utf-8',
        'access-control-allow-origin':'*'
    })
    switch(urlObj.pathname){
        case '/api/xiepeng':
           httpGet((data)=>{
            res.end(`${data}`)
           })
            break
        default :
            res.end('404 not found')
    }
}).listen(3000,()=>{
    console.log('sercer start')
})
function httpGet(cb){
    let data =''
    https.get('https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4',(res)=>{
        res.on('data',(chunk)=>{
            data+=chunk
        })
        res.on('end',()=>{
            cb(data)
        })
    })
}