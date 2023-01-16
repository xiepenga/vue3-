export function setStorageItem(key:string,value:string){
    sessionStorage.setItem(key,value)
}
export function getStorageItem(key:string){
     return sessionStorage.getItem(key)
}
export function removeStorageItem(){
    sessionStorage.clear()
}