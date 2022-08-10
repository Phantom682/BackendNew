const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB
  },
});

const uploadGrievance = async (req, res, next) => {
  console.log(req.file)
  req.file.filename.replace(/ /g, "_");
  res.status(200).json({
    message: "Video upload successful",
  });
};

module.exports = {
    upload,
    uploadGrievance,
}
