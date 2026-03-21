import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, trim: true },
        phone: { type: String, trim: true },
        skills: [{ type: String, trim: true }],
        education: [{ type: String }],
        total_experience_years: { type: String, default: 0, min: 0 },
        filePath: { type: String, required: true },
        extractedText: { type: String, trim: true, required: true },
        embeddings: { type: [Number], default: [] },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Resume", resumeSchema);