const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'image',
    format: async (req, file) => {
      const formatExt = file.mimetype.split('/')[1];
      return formatExt;
    },
    // eslint-disable-next-line no-unused-vars
    public_id: (req, file) => new Date().getTime()
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000
  },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/png', 'image/jpeg', 'image/webp'];
    if (allowExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Extension not supported');
      cb(err, false);
    }
  }
});

module.exports = upload;