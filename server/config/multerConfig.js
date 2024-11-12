// middleware/uploadMiddleware.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideoAndThumbnail = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            if (file.fieldname === 'video') {
                return {
                    folder: 'youthoob/videos',
                    resource_type: 'video',
                    allowed_formats: ['mp4', 'mov', 'webm'],
                };
            } else if (file.fieldname === 'thumbnail') {
                return {
                    folder: 'youthoob/thumbnails',
                    allowed_formats: ['jpg', 'jpeg', 'png'],
                };
            }
        }
    }),
}).fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]);

export const uploadVideoContent = (req, res, next) => {
    uploadVideoAndThumbnail(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: `Error uploading files: ${err.message}` });
        }
        next();
    });
};

// Helper to get video duration
export const getVideoDuration = async (videoUrl) => {
    try {
        const result = await cloudinary.api.resource(videoUrl, {
            resource_type: 'video',
            image_metadata: true
        });
        return Math.round(result.duration || 0);
    } catch (error) {
        console.error('Error getting video duration:', error);
        return 0;
    }
};

const storageImage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'youthoob/channel_assets',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    }
});

export const uploadChannelImage = multer({ storage: storageImage }).fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]);