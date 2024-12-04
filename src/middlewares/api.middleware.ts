import { NextFunction, Request, Response } from "express";
import { cloudinaryConfig } from "../config/cloudinary.config";
import path from "path";

export class ApiMiddleware {
    public static async uploadMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const videoFilePath = path.join(__dirname, '../../public/videos/video.mp4');
            
            const result: string = await new Promise((resolve, reject) => {
                cloudinaryConfig.uploader.upload_large(videoFilePath, { resource_type: 'video' }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.url);
                    }
                });
            });

            req.file = result;
            next();
        } catch (error) {
            next(error);
        }
    }
}