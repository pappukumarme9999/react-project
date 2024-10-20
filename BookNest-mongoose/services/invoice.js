// import easyinvoice from "easyinvoice";
// import fs from 'fs';
// import {Cart} from '../model/cart.model.js'
// export const invoice = async (request, response, next) => {
//     try {
//         const user = request.body.user;
//         const mausam=[1,2,3];
        
//         // const newData = Cart.aggregate([
//         //     {$match:{_id:request.body.user._id}},
//         //     {$group:{}}
//         // ])
//         const product = [
//             {
//                 "quantity": "1",
//                 "description": "IT Book (Second Hand)",
//                 "tax": 6,
//                 "price": 120
//             },
//             {
//                 "quantity": "01",
//                 "description": "The girl in room 105",
//                 "tax": 21,
//                 "price": 90
//             }
//         ]
//         // mausam.map((book,index)=>newData.push({
//         //     quantity: "1",
//         //     description: book.title,
//         //     tax: "6",
//         //     price: book.price
//         // }))
//         var data = {
//             "documentTitle": "Order Invoice", //Defaults to INVOICE
//             "currency": "INR",
//             "taxNotation": "gst", //or gst
//             "marginTop": 25,
//             "marginRight": 25,
//             "marginLeft": 25,
//             "marginBottom": 25,
//             "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
//             //"logoExtension": "png", //only when logo is base64
//             "sender": {
//                 "company": "Pustakalaya",
//                 "address": "Madhovastika rajmohalla chowk Indore (M.P) ",
//                 "zip": "470005",
//                 "city": "Indore",
//                 "country": "India"
//                 //"custom1": "custom value 1",
//                 //"custom2": "custom value 2",
//                 //"custom3": "custom value 3"
//             },
//             "client": {
//                 "company": user,
//                 "address": user,
//                 "zip": "470005",
//                 "city": "Indore",
//                 "country": "India"
//                 //"custom1": "custom value 1",
//                 //"custom2": "custom value 2",
//                 //"custom3": "custom value 3"
//             },
//             "invoiceDate": "05-01-2020",
//             "products": [
//                 {
//                     "quantity": "1",
//                     "description": "IT Book (Second Hand)",
                    
//                     "price": 120
//                 },
//                 {
//                     "quantity": "01",
//                     "description": "The girl in room 105",
                    
//                     "price": 90
//                 }
//             ],
//             "bottomNotice": "Please Visit again !!!"
//         };
//         easyinvoice.createInvoice(data, function (result) {
//             fs.writeFileSync("./Invoices/invoice.pdf", result.pdf, 'base64');
//         });
//     }
//     catch (err) {
//     }
// }