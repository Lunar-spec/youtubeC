import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authController = {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;

            // Check if user exists
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ success: false, error: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

            res.status(201).json({ success: true, token, user });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error registering user' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await prisma.user.findUnique({ where: { email }, include: { channels: true } });
            if (!user) {
                return res.status(400).json({ success: false, error: 'User not found' });
            }

            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ success: false, error: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            res.status(201).json({ success: true, token, user });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error logging in' });
        }
    },

    async getUserMe(req, res) {
        try {
            const userId = req.user.id;
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    channels: {
                        include: {
                            _count: {
                                select: {
                                    videos: true
                                }
                            },
                            videos: {
                                take: 1,
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
                        }
                    }
                }
            });
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Error getting user' });
        }
    },
};
