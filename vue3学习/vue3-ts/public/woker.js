self.importScripts('spark-md5.min.js')
console.log(self)
self.onmessage=(e)=>{
    console.log(13435)
    const {file}=e.data
    const spark=new self.SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    console.log(13435)
    fileReader.onload=(e)=>{
        spark.append(e.target.result)
        self.postMessage({
            hash:spark.end()
        })
    }

}
