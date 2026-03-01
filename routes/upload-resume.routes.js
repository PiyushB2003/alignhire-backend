import express from "express"
import { uploadResumeMiddleware } from "../middlewares/upload.middleware.js";
import { uploadResume } from "../controllers/upload-resume.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/upload-resume", protectRoute, uploadResumeMiddleware, uploadResume);

export default router;