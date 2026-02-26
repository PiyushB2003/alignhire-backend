import express from "express"
import { uploadResumeMiddleware } from "../middlewares/upload.middleware.js";
import { uploadResume } from "../controllers/upload-resume.controller.js";


const router = express.Router();

router.post("/upload-resume", uploadResumeMiddleware, uploadResume);

export default router;