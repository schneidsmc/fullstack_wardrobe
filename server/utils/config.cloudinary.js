import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryDelete = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

export const cloudinaryUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        // categorization: "google_tagging",
        // auto_tagging: 0.7,
        // background_removal: "cloudinary_ai:fine_edges",
      },
      (error, result) => {
        if (result) {
          const backgroundRemovedURL = result.secure_url.replace(
            "/upload/",
            "/upload/e_background_removal/",
          );
          resolve({ ...result, secure_url: backgroundRemovedURL });
        } else {
          reject(error);
        }
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default cloudinary;
