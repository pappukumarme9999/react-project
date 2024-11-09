// Converts a base64 string to an image URL for use in <img> tags
export function base64ToImage(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
}
