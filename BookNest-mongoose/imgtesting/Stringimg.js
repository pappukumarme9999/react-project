import fs from 'fs';

function base64FileToImage(inputTxtFilePath, outputImagePath) {
    try {
        const base64String = fs.readFileSync(inputTxtFilePath, 'utf-8');
        const imageBuffer = Buffer.from(base64String, 'base64');
        fs.writeFileSync(outputImagePath, imageBuffer);
        console.log(`Image saved to: ${outputImagePath}`);
    } catch (error) {
        console.error("Error writing file:", error);
    }
}
base64FileToImage("imgtesting/str.txt", "imgtesting/converted.jpg");
