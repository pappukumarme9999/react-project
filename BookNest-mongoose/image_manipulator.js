import { GridFSBucket } from 'mongodb';

const client = new MongoClient('mongodb://pappukumarme9999:pappu9999@clusterbooknest.jrcon.mongodb.net/?retryWrites=true&w=majority&appName=clusterBooknest');
await client.connect();

const database = client.db('yourDatabase');
const bucket = new GridFSBucket(database);

const fs = require('fs');

const imageStream = fs.createReadStream('public/images/asura.jpg'); // Replace with your image path
const uploadStream = bucket.openUploadStream('asura.jpg'); // Specify your desired filename

imageStream.pipe(uploadStream);

uploadStream.on('finish', (uploadResult) => {
  console.log("File Uploaded:", uploadResult._id); // Get the uploaded file ID
});