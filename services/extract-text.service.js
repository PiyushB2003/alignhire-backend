import path from "path";
import { PDFParse } from 'pdf-parse';
import mammoth from "mammoth";
import tesseract from "tesseract.js";
import { convertPdfToImage } from "../utils/pdf-to-image.js";
import { enhanceImage } from "../utils/enhance-image.js";

export const extractText = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".pdf") {
        const text = await extractFromPdf(filePath);
        if (text.trim().length < 100) {
            const imgText = await extractUsingOcr(filePath);
            if(!imgText) return text;
            return imgText;
        }
        return text;
    }

    if (ext === ".docx") {
        return await extractFromDocx(filePath);
    }

    throw new Error("Unsupported file format");
}

const extractFromPdf = async (filePath) => {
    const parser = new PDFParse({ url: filePath });
    const result = await parser.getText();
    if (!result.text) return "";
    return result.text;
}

const extractFromDocx = async (filePath) => {
    const result = await mammoth.extractRawText({ path: filePath });
    if (!result.value) return "";
    return result.value;
}

const extractUsingOcr = async (filePath) => {
    const imagePath = await convertPdfToImage(filePath);
    if (!imagePath) return "";
    const enhancedPath = await enhanceImage(imagePath);
    if (!enhancedPath) return "";
    const { data: { text } } = await tesseract.recognize(
        enhancedPath,
        "eng"
    )

    return text || "";
}