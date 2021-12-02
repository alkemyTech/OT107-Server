const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadToBucket = async (file, fieldName, awsBucketName) => {
  const stream = fs.createReadStream(file.tempFilePath || file.path);
  const params = {
    Bucket: awsBucketName || bucket,
    Key: fieldName || file.name || file.fieldname || file.originalname,
    Body: stream
  };
  const fileUpload = await s3.upload(params).promise();

  return fileUpload;
};

module.exports = {
  uploadToBucket
};
