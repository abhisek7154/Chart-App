import{v2 as cloudinary} from "cloudinary"

import { config } from "dotenv"

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,
    api_key: process.env.CLOUDINIR_API_KEY,
    api_secret: process.env.CLOUDINIR_API_SECRET,
});

export default cloudinary;