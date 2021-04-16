const cloudinary = require('cloudinary').v2

export const uploadCloudinary = async (image: string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  try {
    const result: ReturnType<typeof cloudinary> = await cloudinary.uploader.upload(image, {
      folder: 'slackit'
    });
    return result.url;
  } catch (e) {
    throw new Error('Error on uploading image');
  }
};
