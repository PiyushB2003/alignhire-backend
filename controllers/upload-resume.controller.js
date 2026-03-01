import { processResume } from "../services/process-resume.service.js";


export const uploadResume = async (req, res) => {
    try {
        const file = req.file;
        if(!file){
            return res.status(400).json({ message: "File not found", status: false });
        }
        const result = await processResume(req.file)
        if(!result){
            return res.status(400).json({ message: "Resume not processed", status: false });
        }
        console.log("=======> resumeText", result);
        
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