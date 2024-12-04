import cloudinary from 'cloudinary';
const cloudinaryVersion = cloudinary.v2;

cloudinaryVersion.config({
    cloud_name: 'djz9u9dcc',
    api_key: '218827861586773',
    api_secret: 'ucSerBzLbKWGjeA6OncABTjVG4Y'
});

export const cloudinaryConfig = cloudinaryVersion;