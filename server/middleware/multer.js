import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid FileType. Only JPEG, PNG and PDF are allowed"));
    }
  },
});

export default upload;
