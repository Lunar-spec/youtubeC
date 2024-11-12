import express from 'express';
import { videoController } from '../controllers/videoController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/videos', videoController.getAllVideos);
router.get('/videos/:id', videoController.getVideoById);

// Protected routes
router.post('/videos/:id/like', auth, videoController.likeVideo);
router.post('/videos/:id/dislike', auth, videoController.dislikeVideo);
router.post('/videos/:id/comments', auth, videoController.commentVideo);
router.post('/comments/:id/like', auth, videoController.likeComment);
router.post('/comments/:id/dislike', auth, videoController.dislikeComment);
router.get('/videos/:id/stats', auth, videoController.getVideoStats);
router.get('/comments/:id/stats', auth, videoController.getCommentsStats);
router.get('/search', videoController.searchController);

export default router;