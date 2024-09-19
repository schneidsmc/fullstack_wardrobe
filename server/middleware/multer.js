import multer from 'multer';
import path from 'path';


const storage = multer.memoryStorage();


const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        console.log("FILE FROM MULTER:", file)
        const filetypes = /jpeg|jpg|png|pdf/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error!!! WITH MULTER or file type not supported')
        }
    }
})

export default upload