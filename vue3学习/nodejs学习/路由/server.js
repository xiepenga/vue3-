const http=require('http')
const {URL}=require('url')
const Router={}

function use(obj){
    Object.assign(Router,obj)
}
function start(){
    http.createServer((req,res)=>{
        const MyUrl=new URL(req.url,"http://127.0.0.1:3000")
        try {
             Router[MyUrl.pathname](req,res)
        } catch (error) {
            Router["/404"](req,res)
        }
    }).listen(3000,()=>{
        console.log('server start')
    })
    
}
exports.start=start
exports.use=use