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
    expiresIn: 3600,
  });
  console.log('getSignedUrl 성공');
  return url;
};

module.exports.deleteFile = async function deleteFile(data) {
  console.log('file delete 시작');
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: data.name,
  };
  const command = new DeleteObjectCommand(params);
  console.log('deleteObjectCommand 시작');
  await s3.send(command);
  console.log('deleteObjectCommand 성공');
}



module.exports.printLog = function printLog() {
  console.log('printlog 실행');
}

