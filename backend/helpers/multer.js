const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const fileName = file?.originalname?.replace(/\s/g, "_");
        cb(null, fileName);
    },
});

var fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|jpg|JPEG|png|jpeg)$/)) {
        return callback(new Error('Invalid file format'), false)
    }
    callback(null, true)
}

const fileUpload = (fieldName) => (req, res, next) => {
    multer({
        storage,
        fileFilter: fileFilter,
    }).array(fieldName, 100)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
    if (req.files) {
        console.log("Uploaded Files:");
        req.files.forEach(file => {
            console.log(`- ${file.originalname} -> ${file.filename}`);
        });
    }

        next();
    });
};

module.exports = fileUpload