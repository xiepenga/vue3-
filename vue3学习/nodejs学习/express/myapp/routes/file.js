var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path')
var fs = require('fs')
const fse = require('fs-extra');
var fileController = require('../controller/fileContorller')
const pathName = path.resolve(__dirname, '../file')

/* GET home page. */
router.post('/', function (req, res, next) {
    const form = new multiparty.Form()
    form.parse(req, async(err, fileds, files) => {
        if (err) {
            res.send({
                ok: 0
            })
            return
        }
        const [hash] = fileds.hash
        const [fileName] = fileds.fileName
        const [chunk] = files.chunk
        if (!fs.existsSync(pathName)) {
            fs.mkdirSync(pathName)
        }
        const filepath = path.resolve(pathName, "Dir" + fileName)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath)
        }
        console.log('size',chunk.size,hash)
        // fs.writeFileSync(`${filepath}/${hash}`, chunk.path)
        await fse.move(chunk.path, `${filepath}/${hash}`);
        
        res.send({
            ok: 11
        })
    })

});
router.post('/merge', function (req, res, next) {
    console.log(1233444)
    const { filename, size ,hash} = req.body
    fileController.mergeFileChunk(pathName, filename,hash)
    res.send({
        ok: 11
    })
});
module.exports = router;