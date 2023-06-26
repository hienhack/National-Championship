const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const url = req.originalUrl;
        const folder = url.split('/')[2];  
        cb(null, `Public/Images/${folder}/`);
    },
  
    filename: function(req, file, cb) {
        const oldName = file.originalname;
        var filename = path.parse(oldName).name + Date.now() + path.extname(oldName);
        cb(null, filename);
    }
});

const uploader = multer({ storage: storage });
module.exports = uploader;