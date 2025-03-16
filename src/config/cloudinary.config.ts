import cloudinary from 'cloudinary';
const cloudinaryVersion = cloudinary.v2;

cloudinaryVersion.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

export const cloudinaryConfig = cloudinaryVersion;
