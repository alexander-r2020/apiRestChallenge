const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,path.join(__dirname,'..','..','public','images','peliculas'))
    },
    filename: (req,file,callback) => {
        const name = 'img-' + Date.now() + path.extname(file.originalname)
        callback(null,name)
    },
});

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes JPG,JPEG,PNG,GIF,WEBP";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const imgUpload = multer({
    storage,
    fileFilter
})

module.exports = imgUpload