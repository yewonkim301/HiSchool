const dotenv = require("dotenv").config();

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  createPresignedPost,
} = require("@aws-sdk/s3-presigned-post");
const {
  getSignedUrl
} = require("@aws-sdk/s3-request-presigner")



const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  },
  region: process.env.AWS_S3_REGION,
});



module.exports.getSignedFileUrl = async function getSignedFileUrl(data) {
  console.log('file signedUrl 시작');
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: data.name,
  };
  const command = new PutObjectCommand(params);
  console.log('putObjectCommand 시작');
  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600 * 60,
  });
  console.log('getSignedUrl 성공');
  return url;
};


module.exports.printLog = function printLog() {
  console.log('printlog 실행');
}

