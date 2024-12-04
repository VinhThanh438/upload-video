import express from 'express'
import { ApiController } from '../controllers/api.controller';
import { ApiMiddleware } from '../middlewares/api.middleware';

const router = express.Router();

router.post('/upload/video', ApiMiddleware.uploadMiddleware, ApiController.uploadVideo);

export = router;