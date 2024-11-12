import { PrismaClient } from "@prisma/client";
import { getVideoDuration } from "../config/multerConfig.js";

const prisma = new PrismaClient();

export const channelController = {
    // Create a channel 
    async createChannel(req, res) {
        try {
            const { name, description } = req.body;
            const userId = req.user.id;  // From JWT auth middleware

            // return console.log(req);

            const avatarUrl = req.files?.avatar?.[0]?.path || null;
            const bannerUrl = req.files?.banner?.[0]?.path || null;

            // Check if user already has a channel
            const existingChannel = await prisma.channel.findUnique({
                where: { userId }
            });

            if (existingChannel) {
                // Delete uploaded files if channel creation fails
                if (avatarUrl) await cloudinary.uploader.destroy(req.files.avatar[0].filename);
                if (bannerUrl) await cloudinary.uploader.destroy(req.files.banner[0].filename);

                return res.status(400).json({
                    success: false,
                    error: 'User already has a channel'
                });
            }

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Channel name is required'
                });
            }

            const channel = await prisma.channel.create({
                data: {
                    name: name.trim(),
                    description: description.trim(),
                    avatarUrl,
                    bannerUrl,
                    userId
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            res.status(201).json({ success: true, channel });
        } catch (error) {
            // Clean up uploaded files on error
            if (req.files?.avatar) await cloudinary.uploader.destroy(req.files.avatar[0].filename);
            if (req.files?.banner) await cloudinary.uploader.destroy(req.files.banner[0].filename);

            res.status(500).json({ success: false, error: 'Error creating channel' });
        }
    },

    // Update channel details
    async updateChannel(req, res) {
        try {
            const { name, description } = req.body;
            const userId = req.user.id;

            const existingChannel = await prisma.channel.findUnique({
                where: { userId }
            });

            // Get uploaded file URLs
            const avatarUrl = req.files?.avatar?.[0]?.path || existingChannel?.avatarUrl || null;
            const bannerUrl = req.files?.banner?.[0]?.path || existingChannel?.bannerUrl || null;

            if (!existingChannel) {
                // Delete uploaded files if channel creation fails
                if (avatarUrl) await cloudinary.uploader.destroy(req.files.avatar[0].filename);
                if (bannerUrl) await cloudinary.uploader.destroy(req.files.banner[0].filename);

                return res.status(404).json({
                    success: false,
                    error: 'Channel not found'
                });
            }

            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Channel name is required'
                });
            }

            const updatedChannel = await prisma.channel.update({
                where: { userId },
                data: {
                    name: name.trim(),
                    description: description.trim(),
                    avatarUrl,
                    bannerUrl
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });

            res.status(200).json({ success: true, channel: updatedChannel });
        } catch (error) {
            // Clean up uploaded files on error
            if (req.files?.avatar) await cloudinary.uploader.destroy(req.files.avatar[0].filename);
            if (req.files?.banner) await cloudinary.uploader.destroy(req.files.banner[0].filename);

            res.status(500).json({ success: false, error: 'Error updating channel' });
        }
    },

    async uploadVideo(req, res) {
        try {
            const { title, description } = req.body;
            const userId = req.user.id;
            if (!req.files?.video || !req.files?.thumbnail) {
                return res.status(400).json({
                    success: false,
                    error: 'Both video and thumbnail are required'
                });
            }

            const videoUrl = req.files.video[0].path;
            const thumbnailUrl = req.files.thumbnail[0].path;
            const duration = await getVideoDuration(req.files.video[0].filename);

            // Verify user has a channel
            const channel = await prisma.channel.findUnique({
                where: { userId }
            });

            if (!channel) {
                // Clean up uploaded files
                await cloudinary.uploader.destroy(req.files.video[0].filename, { resource_type: 'video' });
                await cloudinary.uploader.destroy(req.files.thumbnail[0].filename);

                return res.status(404).json({
                    success: false,
                    error: 'You must create a channel before uploading videos'
                });
            }

            const video = await prisma.video.create({
                data: {
                    title: title.trim(),
                    description: description.trim(),
                    url: videoUrl,
                    thumbnailUrl,
                    duration,
                    channelId: channel.id
                },
                include: {
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
            });

            res.status(201).json({ success: true, video });
        } catch (error) {
            if (req.files?.video) {
                await cloudinary.uploader.destroy(req.files.video[0].filename, { resource_type: 'video' });
            }
            if (req.files?.thumbnail) {
                await cloudinary.uploader.destroy(req.files.thumbnail[0].filename);
            }

            res.status(500).json({ success: false, error: 'Error uploading video' });
        }
    },
    // Get user's channel
    async getUserChannel(req, res) {
        try {
            const userId = req.user.id;

            const channel = await prisma.channel.findUnique({
                where: { userId },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    videos: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            _count: {
                                select: {
                                    likes: true,
                                    dislikes: true,
                                    comments: true
                                }
                            }
                        }
                    }
                }
            });

            if (!channel) {
                return res.status(404).json({
                    success: false,
                    error: 'Channel not found'
                });
            }

            res.status(200).json({ success: true, channel });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error getting user channel' });
        }
    },

    // Get channel by ID (public route)
    async getChannelById(req, res) {
        try {
            const { id } = req.params;

            const channel = await prisma.channel.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    videos: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            _count: {
                                select: {
                                    likes: true,
                                    dislikes: true,
                                    comments: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            videos: true
                        }
                    }
                }
            });

            if (!channel) {
                return res.status(404).json({
                    success: false,
                    error: 'Channel not found'
                });
            }

            res.status(200).json({ success: true, channel });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error getting channel' });
        }
    },
    async deleteVideoById(req, res) {
        try {
            const { id } = req.params;

            const video = await prisma.video.findUnique({
                where: { id }
            });

            if (!video) {
                return res.status(404).json({
                    success: false,
                    error: 'Video not found'
                });
            }

            await prisma.video.delete({
                where: { id }
            });

            res.status(200).json({ success: true, video });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error deleting videos' });
        }
    }
};