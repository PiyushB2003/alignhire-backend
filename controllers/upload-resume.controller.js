import { processResume } from "../services/resume.service.js";


export const uploadResume = async (req, res) => {
    try {
        const result = await processResume(req.file)

        return res.status(200).json({ 
            message: "Resume processed successfully",
            status: true,
            data: result
        });
    } catch (error) {
        console.error("Error in uploading resume", error);
        return res.status(500).json({ message: error.message, status: false })
    }
}