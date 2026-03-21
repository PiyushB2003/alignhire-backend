import sharp from "sharp";

export const enhanceImage = async (inputPath) => {
    const outputPath = inputPath.replace(".png", "-enhanced.png");
    await sharp(inputPath)
        .greyscale()
        .normalize()
        .sharpen()
        .resize({ width: 2000 })
        .png({ quality: 100 })
        .toFile(outputPath);

    return outputPath;
}