import express from 'express';
import { channelController } from '../controllers/channelController.js';
import { auth } from '../middleware/auth.js';
import { uploadChannelImage, uploadVideoContent } from '../config/multerConfig.js';

const router = express.Router();

// Public routes
router.get('/channels/:id', channelController.getChannelById);

// Protected routes - require authentication
router.post('/channels', auth, uploadChannelImage, channelController.createChannel);
router.put('/channels', auth, uploadChannelImage, channelController.updateChannel);
router.post('/channels/videos', auth, uploadVideoContent, channelController.uploadVideo);
router.get('/me/channel', auth, channelController.getUserChannel);
router.delete('/channels/video/:id', auth, channelController.deleteVideoById);

export default router;