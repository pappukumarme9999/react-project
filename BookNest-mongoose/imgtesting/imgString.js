import fs from 'fs';

function imageToBase64File(inputImagePath, outputTxtFilePath) {
    try {
        const imageBuffer = fs.readFileSync(inputImagePath);
        const base64String = imageBuffer.toString('base64');
        fs.writeFileSync(outputTxtFilePath, base64String);
        console.log(`Base64 string saved to: ${outputTxtFilePath}`);
    } catch (error) {
        console.error("Error processing file:", error);
    }
}

imageToBase64File("imgtesting/asura.jpg", "imgtesting/str.txt");
