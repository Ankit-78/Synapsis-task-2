const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
function fileFilter(req, file, cb) {
  cb(null, true);
}
module.exports = multer({ storage, fileFilter });