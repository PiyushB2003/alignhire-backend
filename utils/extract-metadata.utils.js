import { generateContent } from "../services/gemini.service.js";

export const extractMetadata = async (text) => {
    const prompt = `
Extract the following information from this resume.

Return ONLY valid JSON.

Fields:
name (string)
email (string)
phone (string)
skills (array of strings)
education (array of strings)
total_experience_years (floating number)

Resume:
${text}
`;

    const response = await generateContent(prompt);
    if (!response) return null;
    let cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    try {
        console.log("JSON.parse(cleaned)", JSON.parse(cleaned));
        
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Error parsing JSON:", error, cleaned);
        return null;
    }
}