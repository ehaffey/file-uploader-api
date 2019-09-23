require('dotenv').config()
const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})
// console.log(AWS)

const s3 = new AWS.S3({apiversion: '2006-03-01'})
// console.log(s3)

const uploadParams = {
  Bucket: process.env.BUCKET_NAME,
  Key: 'Anything',
  Body: '',
  ACL: 'public-read'
}

const fileStream = fs.createReadStream(process.argv[2])
fileStream.on('error', function (err) {
  console.log('File Error', err)
})
uploadParams.Body = fileStream
// const path = require('path')

s3.upload(uploadParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } if (data) {
    console.log('Upload Success', data.Location)
  }
})
