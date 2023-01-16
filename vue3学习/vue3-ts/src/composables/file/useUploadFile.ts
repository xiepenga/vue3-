import { fileMerge, fileUpload } from "@/api/formdata/fromdata";
import { ElInput, ElMessage } from "element-plus";
import qs from "qs"
import { computed, getCurrentInstance, reactive, ref } from "vue";
interface container {
    file: File | null,
    data: Array<any>,
    fileHash:string
}
const SIZE = 30 * 1024 * 1024
export const useUploadFile = () => {
    const { proxy } = getCurrentInstance() as any
    const fileRef = ref<InstanceType<typeof ElInput>>()
    const containerData = reactive<container>({
        file: null,
        data: [],
        fileHash:''
    })
    let loadeds=reactive<Array<number>>([])
    const createChunkList = (size = SIZE) => {
        let cur = 0
        const file = containerData.file as File
        let fileChunkList = []
        while (cur < file.size) {
            fileChunkList.push({ file: file.slice(cur, cur + SIZE) })
            cur += SIZE
        }
        return fileChunkList
    }
    const calculateHash=(file:any):Promise<string>=>{
        return new Promise((resolve)=>{
            const woker= new Worker("public/woker.js")
            woker.postMessage({
                file
            })
            woker.onmessage=(e)=>{
                const {hash}=e.data
                console.log(hash)
                resolve(hash)
            }
        })
    }
    const handleChange = () => {
        const [file] = proxy.$refs.fileRef.files
        if (!file) return
        containerData.file = file
    }
    const mergeRequset = () => {
        return fileMerge(qs.stringify({
            filename: containerData.file!.name,
            size:SIZE,
            hash:containerData.fileHash
        }))
    }
    const percentage=computed(()=>{
        const uploadsize=loadeds.reduce((pre:number,cur:number)=>{
            return pre+cur
        },0)
        if(containerData.file){
            return parseInt((uploadsize/containerData.file!.size).toFixed(2))*100
        }else{
            return 0
        }
        
    })
    const uploadChunk = () => {
        const requestList = containerData.data.map(({ chunk, hash },index) => {
            loadeds[index]=0
            const formdata = new FormData()
            formdata.append('chunk', chunk)
            formdata.append('hash', hash)
            formdata.append('fileName', containerData.fileHash)
            return fileUpload(formdata,(pres:any)=>{
                loadeds[index]=pres.loaded as number
            })
        })
        return Promise.all(requestList)
    }
    const uploadFile = async () => {
        if (!containerData.file) {
            ElMessage.error('请选择文件')
            return
        }
        const fileChunkList = createChunkList()
        containerData.fileHash=await calculateHash(containerData.file)
        containerData.data = fileChunkList.map(({ file }, index) => ({
            chunk: file,
            hash: containerData.fileHash + "-" + index
        }))
        await uploadChunk()
        mergeRequset()
    }
    const file = ref('') as any
    return {
        fileRef,
        handleChange,
        file,
        uploadFile,
        percentage
    }
}