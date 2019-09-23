require('dotenv').config()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})
const s3 = new AWS.S3({apiversion: '2006-03-01'})
// console.log(AWS)
const awsFileUpload = function (key, file) {
  return new Promise((resolve, reject) => {
  // console.log(s3)
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }
    // const path = require('path')

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = awsFileUpload
