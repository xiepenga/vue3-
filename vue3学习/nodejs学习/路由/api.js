
const {URL}=require('url')
function render(res,data,type){
    res.writeHead(200,{
        "Content-Type":`${type?type:'application/json'};charset=utf-8`
    })
    res.write(JSON.stringify(data))
    res.end()
}
const api={
    '/api/login':(req,res)=>{
        console.log(12369)
        if(req.method==="POST"){
            resPost(req,res)
        }else{
            resGet(req,res)
        }

    },
}
function resGet(req,res){
    const myUrl=new URL(req.url,"http://127.0.0.1:3000")
    const userName=myUrl.searchParams.get('userName')
    const password=myUrl.searchParams.get('password')
    if(userName==='xiepeng'&&password==="123456"){
        render(res,"登录成功")
    }else{
        render(res,"失败登录")
    }
}
function resPost(req,res){
    console.log(12366666979)
    let data=''
    req.on('data',(chunk)=>{
        data+=chunk
    })
    req.on('end',()=>{
       data=JSON.parse(data)
        if(data.userName==='xiepeng'&&data.password==="123456"){
            render(res,"登录成功")
        }else{
            render(res,"失败登录")
        }
    })
}
module.exports=api