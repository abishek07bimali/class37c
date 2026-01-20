const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "_");
    cb(null, Date.now() + "_" + fileName);
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
    return callback(new Error("Only image files are allowed"), false);
  }
  callback(null, true);
};

// single + multiple handler
const uploadProductImages = (req, res, next) => {
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).fields([
    { name: "thumbnail", maxCount: 1 },   // single image
    { name: "images", maxCount: 10 },      // multiple images
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = uploadProductImages;
