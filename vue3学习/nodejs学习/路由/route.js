const mime=require('mime')
const path=require('path')
const {URL}=require('url')
const fs=require('fs')
function render(res,url){
    debugger
    const type=mime.getType(path.extname(url))
    res.writeHead(200,{
        "Content-Type":`${type?type:'text/html'};charset=utf-8`
    })
    res.write(fs.readFileSync(url,'utf-8'))
    res.end()
}
const route={
    '/login':(req,res)=>{
        console.log(1111)
        render(res,'./static/login.html') 
    },
    '/index':(req,res)=>{
        render(res,'./static/index.html') 
    },
    '/home':(req,res)=>{
        render(res,'./static/home.html') 
    },
    '/':(req,res)=>{
        render(res,'./static/home.html') 
    },
    '/404':(req,res)=>{
        const myUrl=new URL(req.url,"http://127.0.0.1:3000")
        if(fs.existsSync(path.join(__dirname,'static',myUrl.pathname))){
            render(res,path.join(__dirname,'static',myUrl.pathname))
            return
        }
        res.writeHead(404,{
            "Content-Type":`text/html;charset=utf-8`
        })
        res.write(fs.readFileSync("./static/404.html",'utf-8'))
        res.end()
    }
}
exports.route=route