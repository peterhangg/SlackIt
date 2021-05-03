const cloudinary = require('cloudinary').v2;
import { cloudinaryConfig } from '../config/cloudinaryConfig';

import { Upload, ICloudinary } from '../utils/interfaces';

export const uploadCloudinary = async (image: Upload) => {
  cloudinary.config(cloudinaryConfig);

  const { createReadStream } = image.file;

  try {
    const result: ICloudinary = await new Promise((resolve, reject) => {
      createReadStream().pipe(
        cloudinary.uploader.upload_stream(
          {
            folder: process.env.CLOUDINARY_FOLDER,
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

    return result;
  } catch (e) {
    throw new Error('Error on uploading image');
  }
};
