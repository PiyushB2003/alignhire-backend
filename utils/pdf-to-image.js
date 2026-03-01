import path from "path";
import pdfPoppler from "pdf-poppler";

export const convertPdfToImage = async (filePath) => {
    const outputDir = path.dirname(filePath);
    const opts = {
        format: "png",
        out_dir: outputDir,
        out_prefix: "page",
        page: 1
    }
    await pdfPoppler.convert(filePath, opts);
    return path.join(outputDir, "page-1.png");
}