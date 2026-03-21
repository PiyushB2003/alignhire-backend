import Resume from "../models/Resume.model.js";
import { cleanText } from "../utils/clean-text.utils.js";
import { extractMetadata } from "../utils/extract-metadata.utils.js";
import { extractText } from "./extract-text.service.js";
import { generateEmbedding } from "./gemini.service.js";

export const processResume = async (file, userId) => {

  if (!file || !file.path || !userId) return null;

  // 1. Extract text from file
  const rawText = await extractText(file.path);
  if (!rawText) return null;

  // 2. Clean text
  const cleanedText = cleanText(rawText);
  if (!cleanText) return null;

  // 3. Extract metadata
  const metadata = await extractMetadata(cleanedText);
  if (!metadata) return null;

  // 4. Generate embedding
  const embedding = await generateEmbedding(cleanedText);
  if (!embedding) return null;

  // 5. Save to DB
  const resumeDoc = await Resume.create({
    ...metadata,
    user: userId,
    filePath: file.path,
    extractedText: cleanedText,
    embeddings: embedding,
  });
  if (!resumeDoc) return null;

  return resumeDoc;
};