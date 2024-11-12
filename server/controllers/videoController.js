import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const videoController = {
    async getAllVideos(req, res) {
        try {
            const videos = await prisma.video.findMany(
                {
                    include: {
                        _count: {
                            select: {
                                likes: true,
                                dislikes: true,
                                comments: true
                            }
                        },
                        channel: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            );
            if (!videos) {
                return res.status(404).json({ success: false, error: 'Videos not found' });
            }
            res.status(200).json({ success: true, videos });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error fetching videos' });
        }
    },

    async getVideoById(req, res) {
        try {
            const video = await prisma.video.findUnique({
                where: { id: req.params.id },
                include: {
                    channel: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true,
                            comments: true
                        }
                    },
                    likes: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    channels: true
                                }
                            }
                        }
                    },
                    dislikes: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    channels: true
                                }
                            }
                        }
                    },
                    comments: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    channels: true
                                }
                            },
                            likes: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            },
                            dislikes: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            },
                            _count: {
                                select: {
                                    likes: true,
                                    dislikes: true
                                }
                            }
                        }
                    }
                }
            });

            if (!video) {
                return res.status(404).json({ success: false, error: 'Video not found' });
            }

            // Increment views
            await prisma.video.update({
                where: { id: req.params.id },
                data: { views: { increment: 1 } }
            });

            res.status(200).json({ success: true, video });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error: 'Error fetching videos' });
        }
    },
    // post a like for a video
    async likeVideo(req, res) {
        try {
            const videoId = req.params.id;
            const userId = req.user.id;

            const video = await prisma.video.findUnique({
                where: { id: videoId },
            });

            if (!video) {
                return res.status(404).json({ success: false, error: 'Video not found' });
            }

            // Start transaction for like/dislike operations
            const result = await prisma.$transaction(async (tx) => {
                // Check if the user has already liked the video
                const existingLike = await tx.videoLike.findFirst({
                    where: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                if (existingLike) {
                    // If the user has already liked the video, remove the like
                    await tx.videoLike.delete({
                        where: {
                            id: existingLike.id,
                        },
                    });
                    return { action: 'removed' };
                }

                // Remove any existing dislike before adding the like
                await tx.videoDislike.deleteMany({
                    where: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                // Add the new like
                await tx.videoLike.create({
                    data: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                return { action: 'added' };
            });

            return res.status(200).json({
                success: true,
                message: `Like ${result.action}`,
                action: result.action,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error liking video' });
        }
    },

    async dislikeVideo(req, res) {
        try {
            const videoId = req.params.id;
            const userId = req.user.id;

            const video = await prisma.video.findUnique({
                where: { id: videoId },
            });

            if (!video) {
                return res.status(404).json({ success: false, error: 'Video not found' });
            }

            // Start transaction for like/dislike operations
            const result = await prisma.$transaction(async (tx) => {
                // Check if the user has already disliked the video
                const existingDislike = await tx.videoDislike.findFirst({
                    where: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                if (existingDislike) {
                    // If the user has already disliked the video, remove the dislike
                    await tx.videoDislike.delete({
                        where: {
                            id: existingDislike.id,
                        },
                    });
                    return { action: 'removed' };
                }

                // Remove any existing like before adding the dislike
                await tx.videoLike.deleteMany({
                    where: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                // Add the new dislike
                await tx.videoDislike.create({
                    data: {
                        userId: userId,
                        videoId: videoId,
                    },
                });

                return { action: 'added' };
            });

            return res.status(200).json({
                success: true,
                message: `Dislike ${result.action}`,
                action: result.action,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error disliking video' });
        }
    },
    // post a comment 
    async commentVideo(req, res) {
        try {
            const { content } = req.body;
            if (!content || content.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Comment content is required'
                });
            }

            const video = await prisma.video.findUnique({
                where: { id: req.params.id }
            });

            if (!video) {
                return res.status(404).json({
                    success: false,
                    error: 'Video not found'
                });
            }

            const comment = await prisma.comment.create({
                data: {
                    content: content.trim(),
                    userId: req.user.id,
                    videoId: video.id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true
                        }
                    }
                }
            });

            return res.status(201).json({ success: true, comment });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error posting comment' });
        }
    },
    async likeComment(req, res) {
        try {
            const commentId = req.params.id;
            const userId = req.user.id;

            const comment = await prisma.comment.findUnique({
                where: { id: commentId }
            });

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    error: 'Comment not found'
                });
            }

            // Start transaction for like/dislike operations
            const result = await prisma.$transaction(async (tx) => {
                // Check for existing like
                const existingLike = await tx.commentLike.findFirst({
                    where: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                // If like exists, remove it (unlike)
                if (existingLike) {
                    await tx.commentLike.delete({
                        where: {
                            id: existingLike.id
                        }
                    });
                    return { action: 'removed' };
                }

                // Remove any existing dislike before adding like
                await tx.commentDislike.deleteMany({
                    where: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                // Add new like
                await tx.commentLike.create({
                    data: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                return { action: 'added' };
            });

            const stats = await prisma.comment.findUnique({
                where: { id: commentId },
                select: {
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true
                        }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: `Like ${result.action}`,
                action: result.action,
                stats: stats._count
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error liking comment' });
        }
    },

    async dislikeComment(req, res) {
        try {
            const commentId = req.params.id;
            const userId = req.user.id;

            const comment = await prisma.comment.findUnique({
                where: { id: commentId }
            });

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    error: 'Comment not found'
                });
            }

            // Start transaction for like/dislike operations
            const result = await prisma.$transaction(async (tx) => {
                // Check for existing dislike
                const existingDislike = await tx.commentDislike.findFirst({
                    where: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                // If dislike exists, remove it (un-dislike)
                if (existingDislike) {
                    await tx.commentDislike.delete({
                        where: {
                            id: existingDislike.id
                        }
                    });
                    return { action: 'removed' };
                }

                // Remove any existing like before adding dislike
                await tx.commentLike.deleteMany({
                    where: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                // Add new dislike
                await tx.commentDislike.create({
                    data: {
                        userId: userId,
                        commentId: commentId
                    }
                });

                return { action: 'added' };
            });

            const stats = await prisma.comment.findUnique({
                where: { id: commentId },
                select: {
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true
                        }
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: `Dislike ${result.action}`,
                action: result.action,
                stats: stats._count
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error disliking comment' });
        }
    },

    async getVideoStats(req, res) {
        try {
            const videoId = req.params.id;

            const video = await prisma.video.findUnique({
                where: { id: videoId },
            });

            if (!video) return res.status(404).json({ success: false, error: 'Video not found' });

            const comments = await prisma.comment.findMany({
                where: { videoId },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            dislikes: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            const likes = await prisma.videoLike.groupBy({
                by: ['userId'],
                _count: {
                    userId: true
                },
                where: {
                    userId: {
                        in: comments.map((comment) => comment.user.id)
                    }
                }
            })

            const dislikes = await prisma.videoDislike.groupBy({
                by: ['userId'],
                _count: {
                    userId: true
                },
                where: {
                    userId: {
                        in: comments.map((comment) => comment.user.id)
                    }
                }
            })

            comments.forEach((comment) => {
                comment._count.likes = likes.find((like) => like.commentId === comment.id)?._count.commentId || 0;
                comment._count.dislikes = dislikes.find((dislike) => dislike.commentId === comment.id)?._count.commentId || 0;
            });

            res.status(200).json({
                success: true, stats: {
                    video, comments, likes, dislikes
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error getting video stats' });
        }
    },

    async getCommentsStats(req, res) {
        try {
            const commentId = req.params.id;

            const comment = await prisma.comment.findUnique({
                where: { id: commentId },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
            });

            if (!comment) return res.status(404).json({ success: false, error: 'Comment not found' });

            const likes = await prisma.commentLike.groupBy({
                by: ['userId'],
                _count: {
                    userId: true
                },
                where: {
                    userId: {
                        in: [comment.user.id]
                    }
                }
            })

            const dislikes = await prisma.commentDislike.groupBy({
                by: ['userId'],
                _count: {
                    userId: true
                },
                where: {
                    userId: {
                        in: [comment.user.id]
                    }
                }
            })

            res.status(200).json({
                success: true, stats: {
                    comment, likes, dislikes
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: 'Error getting video stats' });
        }
    },

    async searchController(req, res) {
        try {
            const searchQuery = req.query.query;

            if (!searchQuery || searchQuery.trim() === '') {
                return res.status(400).json({ success: false, error: 'Search query is required' });
            }

            const videos = await prisma.video.findMany({
                where: {
                    OR: [
                        { title: { contains: searchQuery, mode: 'insensitive' } },
                        { description: { contains: searchQuery, mode: 'insensitive' } }
                    ]
                },
                include: {
                    channel: true,
                    likes: true,
                    dislikes: true,
                    comments: true,

                    _count: {
                        select: {
                            likes: true,
                            dislikes: true,
                            comments: true
                        }
                    }
                }
            });

            if (!videos) {
                return res.status(404).json({ success: false, error: 'No videos found' });
            }

            res.status(200).json({ success: true, videos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Error searching videos' });
        }
    }
}
