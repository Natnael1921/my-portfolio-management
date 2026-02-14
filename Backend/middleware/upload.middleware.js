import multer from "multer";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s/g, "-");

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

export default upload;
