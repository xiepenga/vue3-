const http=require('http')
const url=require('url')
http.createServer((req,res)=>{
    const urlObj=url.parse(req.url,true)
    res.writeHead(200,{
        'content-type':'application/json;charset=utf-8',
        'access-control-allow-origin':'*'
    })
    switch(urlObj.pathname){
        case '/api/xiepeng':
            res.end(`${JSON.stringify({
                name:'xiepng',
                key:123
            })}`)
            break
        default :
            res.end('404 not found')
    }
}).listen(3000,()=>{
    console.log('sercer start')
})