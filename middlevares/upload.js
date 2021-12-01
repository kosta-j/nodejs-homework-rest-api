const multer = require('multer')
const path = require('path')
const { UnsupportedMediaType } = require('http-errors')

const tempDir = path.join(__dirname, '../', 'tmp')
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb(new UnsupportedMediaType(), false)
  }
  cb(null, true)
}

const upload = multer({
  storage: multerConfig,
  fileFilter: fileFilter,
})

module.exports = upload
