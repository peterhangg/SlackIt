const cloudinary = require('cloudinary').v2;
import { Upload, ICloudinary } from '../types';

export const uploadCloudinary = async (image: Upload) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const { createReadStream } = await image.file;

  try {
    const result: ICloudinary = await new Promise((resolve, reject) => {
      createReadStream().pipe(
        cloudinary.uploader.upload_stream(
          {
            folder: 'slackit',
          },
          (error: any, result: ICloudinary) => {
            if (error) {
              reject(error);
            }

            resolve(result);
          }
        )
      );
    });

    return result.url;
  } catch (e) {
    throw new Error('Error on uploading image');
  }
};
