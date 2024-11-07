// src/utils/imageToBase64.js
/**
 * Converts an image file to a Base64 string.
 * @param {File} file - The image file to be converted.
 * @returns {Promise<string>} - A promise that resolves to the Base64 string of the image.
 */
export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(`Error converting image to base64: ${error.message}`);
    });
};



/*
to be imported in the component an image is being uploaded
src\components\DonateBooks\DonateForm.js
src\components\SellBook\SellBook.js
src\components\Donetors\Donetors.js
src\components\User\MyAccount\Account.js
src\components\User\MyAccount\Update.js
src\components\User\MyAccount\UpdateBook\UpdateBook.js


*/