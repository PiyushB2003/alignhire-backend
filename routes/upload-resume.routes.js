import express from "express"
import { uploadResumeMiddleware } from "../middlewares/upload.middleware.js";
import { uploadResume } from "../controllers/upload-resume.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { uploadResumeSchema } from "../validators/upload-resume.validator.js";


const router = express.Router();

router.post(
    "/upload-resume",
    uploadResumeMiddleware,
    validate(uploadResumeSchema),
    uploadResume
);

export default router;