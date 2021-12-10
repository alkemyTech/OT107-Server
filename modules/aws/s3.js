const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filesHandlerModule = require('../filesHandler');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucket = process.env.AWS_BUCKET;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadToBucket = async (file, awsBucketName) => {
  const stream = fs.createReadStream(file.tempFilePath || file.path);
  const extension = path.extname(file.name || file.fieldname || file.originalname).toLowerCase();
  const params = {
    Bucket: awsBucketName || bucket,
    Key: uuidv4() + extension,
    Body: stream
  };
  const fileUpload = await s3.upload(params).promise();

  return fileUpload;
};

const uploadImage = async (image, awsBucketName) => {
  const fileName = image.name || image.fieldname || image.originalname.toLowerCase();
  filesHandlerModule.isImage(fileName);
  const imageUploaded = await uploadToBucket(image, awsBucketName);
  return imageUploaded;
};

module.exports = {
  uploadToBucket,
  uploadImage
};
