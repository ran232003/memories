const multer = require("multer");
const { uuid } = require("uuidv4");
const fileType = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    //taking only the file extension and put random uuid.
    //that way we can upload the same pic
    fileExtansion = fileType[file.mimetype];
    cb(null, uuid() + "." + fileExtansion);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
