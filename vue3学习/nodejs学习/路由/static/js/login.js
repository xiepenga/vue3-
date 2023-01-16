const userName=document.querySelector('#userName')
const password=document.querySelector('#password')
const getBtn=document.querySelector('#getBtn')
const postBtn=document.querySelector('#postBtn')
getBtn.onclick=()=>{
    fetch(`http://localhost:3000/api/login?userName=${userName.value}&password=${password.value}`).then(res=>res.json()).then(res=>{
        console.log(res)
    })
}


postBtn.onclick=()=>{ 
    fetch('http://localhost:3000/api/login',{
        method:"POST",
        body:JSON.stringify({
            userName:userName.value,
            password:password.value
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(res=>{
        console.log(res)
    })
}
