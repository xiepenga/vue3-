var fs = require('fs')
const path = require('path')
const mergeFileChunk = async (pathName,filename,hash) => {
    const dirPath=path.resolve(pathName,"Dir"+hash)
    const chunkList = fs.readdirSync(dirPath)
    console.log(chunkList)
    chunkList.sort((a, b) => a.split("-")[1] - b.split("-")[1])
    const writestream=fs.createWriteStream(path.resolve(pathName,filename))
    for(let i=0;i<chunkList.length;i++){
        const filepath=path.resolve(dirPath,chunkList[i])
        console.log(filepath)
        await pipestream(filepath,writestream)
    }
    // writestream.close()
    // setTimeout(() => {
    // fs.rmdirSync(dirPath) 
    // }, 1000);
}
const pipestream = (filepath, writestream) => {
    return new Promise((resolve, reject) => {
        const readstream = fs.createReadStream(filepath)
        readstream.on('end', () => {
            // fs.unlinkSync(filepath)
            console.log(filepath)
            resolve()
        })
        readstream.pipe(writestream)
    })
}
module.exports={
    mergeFileChunk
}
