import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateContent = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const contentText = response.text;
  if (!contentText) return null;

  return contentText;
};

export const generateEmbedding = async (text) => {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text
    });

    const embedding = Array.from(response.embeddings.values());
    if (!embedding[0].values) return null;

    return embedding[0].values;
  } catch (error) {
    console.error("Embedding error: ", error);
    throw error;
  }
}