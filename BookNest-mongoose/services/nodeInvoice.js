import pdf from 'pdf-creator-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
export const PDF = async (request, response, next) => {
    try {

        const userDetails = request.body.user;
        const books = request.body.books;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        var html = fs.readFileSync(path.join(__dirname,'./invoice.html',),"utf-8");
        var options = {
            format: 'A3',
            oreintiation: 'portrait',
            border: '10mm'
        };
        var users = [
            {
                "quantity": "1",
                "description": "IT Book (Second Hand)",
                "tax": 6,
                "price": 120
            },
            {
                "quantity": "01",
                "description": "The girl in room 105",
                "tax": 21,
                "price": 90
            }
        ];
        var document = {
            html: html,
            data: {
                user : userDetails,
                books : books
            },
            path: './Invoices/creator.pdf',
            type: ""
        }
        pdf.create(document, options).then().catch();

    } catch (err) {
    }
}
