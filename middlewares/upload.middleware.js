import { upload } from "../services/multer-upload.service.js";

export const uploadResumeMiddleware = (req, res, next) => {
    upload.single("resume")(req, res, function (err) {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    message: "File size should not exceed 5MB",
                    status: false,
                });
            }
            return res.status(400).json({
                message: err.message,
                status: false,
            });
        }
        next();
    });
};