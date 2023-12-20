const dotenv = require("dotenv").config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')


// const client = new S3Client({});
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    // bucket: process.env.AWS_S3_BUCKET,
  },
  region: process.env.AWS_S3_REGION,
});

const s3fileUpload = async () => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });

  try {
    const response = await client.send(command);
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};


module.exports = s3fileUpload;