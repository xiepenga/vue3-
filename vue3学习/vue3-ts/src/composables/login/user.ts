import { getImageApi } from "@/api/user/user"
import { onMounted, ref } from "vue"

export const  userImage=()=>{
    let imageSrc=ref('')
    const getImage=async ()=>{
        await getImageApi().then(res=>{
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
            ) 
        }).then(res=>{
            imageSrc.value=res
        })
    }

    onMounted(()=>{
        getImage()
    })
    return{
        imageSrc,
        getImage
    }
}