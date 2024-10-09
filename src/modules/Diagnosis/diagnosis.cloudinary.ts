import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:process.env.API_KEY ,
  api_secret:process.env.API_SECRET
});

export const newStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'hospital',
      allowedFormats: ["png", "jpeg", "jpg","pdf"]
    };
  },
});

export const upload = multer({ storage: newStorage })