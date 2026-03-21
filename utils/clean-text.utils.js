export const cleanText = (text) => {
    if (!text) return "";

    let cleaned = text;

    // Normalize line breaks
    cleaned = cleaned.replace(/\r\n/g, "\n");

    // Remove excessive blank lines
    cleaned = cleaned.replace(/\n{2,}/g, "\n");

    // Remove weird bullets
    cleaned = cleaned.replace(/[•●▪►]/g, "");

    // Remove non-ASCII
    cleaned = cleaned.replace(/[^\x00-\x7F]/g, " ");

    // Collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");

    return cleaned.trim();
}