import { NextFunction, Request, Response } from "express";

export class ApiController {
    public static async uploadVideo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const file = req.file;
            res.status(200).json({ message: 'oke ', file_path: file });
        } catch (error) {
            next(error);
        }
    }
}