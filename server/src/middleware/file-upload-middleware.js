const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.env.IMG_FOLDER);
  },
  filename(req, file, cb) {
    const [ext] = file.originalname.split('.').reverse();
    const filename = `${Date.now()}-${file.fieldname}.${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

module.exports = {
  updloadSingle: (formDataKey) => upload.single(formDataKey),
};
