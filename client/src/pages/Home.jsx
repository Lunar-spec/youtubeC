import { useEffect } from "react";
import HomeCard from "../components/shared/HomeCard";
import { useState } from "react";
import { getAllVideos } from "../api/videos";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";

const Home = () => {
    // Dummy data array with Unsplash images
    // const videos = [
    //     {
    //         id: "1",
    //         thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60',
    //         title: "Building a Modern Web App with Next.js and Tailwind CSS",
    //         creator: {
    //             name: "Code Master",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster"
    //         },
    //         views: 1234567,
    //         uploadDate: new Date('2024-10-20')
    //     },
    //     {
    //         id: "2",
    //         thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    //         title: "Learn TypeScript in 2024 - Complete Beginner's Guide",
    //         creator: {
    //             name: "TypeScript Guru",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TypeScriptGuru"
    //         },
    //         views: 892340,
    //         uploadDate: new Date('2024-10-15')
    //     },
    //     {
    //         id: "3",
    //         thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    //         title: "React Server Components Explained - The Future of React",
    //         creator: {
    //             name: "React Insider",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReactInsider"
    //         },
    //         views: 443200,
    //         uploadDate: new Date('2024-10-18')
    //     },
    //     {
    //         id: "4",
    //         thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop&q=60',
    //         title: "10 CSS Tricks You Didn't Know About - Web Development Tips",
    //         creator: {
    //             name: "CSS Wizard",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CSSWizard"
    //         },
    //         views: 223450,
    //         uploadDate: new Date('2024-10-19')
    //     },
    //     {
    //         id: "5",
    //         thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    //         title: "Building a YouTube Clone - Full Stack Tutorial",
    //         creator: {
    //             name: "Full Stack Master",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FullStackMaster"
    //         },
    //         views: 678900,
    //         uploadDate: new Date('2024-10-17')
    //     },
    //     {
    //         id: "6",
    //         thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60',
    //         title: "Database Design Fundamentals - SQL vs NoSQL",
    //         creator: {
    //             name: "Database Pro",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DatabasePro"
    //         },
    //         views: 345600,
    //         uploadDate: new Date('2024-10-16')
    //     },
    //     {
    //         id: "7",
    //         thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
    //         title: "Advanced Git Commands Every Developer Should Know",
    //         creator: {
    //             name: "Git Expert",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GitExpert"
    //         },
    //         views: 567800,
    //         uploadDate: new Date('2024-10-14')
    //     },
    //     {
    //         id: "8",
    //         thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    //         title: "Building Scalable APIs with Node.js and Express",
    //         creator: {
    //             name: "Backend Ninja",
    //             avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BackendNinja"
    //         },
    //         views: 789000,
    //         uploadDate: new Date('2024-10-13')
    //     }
    // ];

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getAllVideos();
                // console.log(response)
                if (response.success) {
                    setVideos(response.videos)
                } else {
                    // console.log(response.error)
                    toast.error(response.error)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchVideos();
    }, []);

    if (!videos) return <Loader />

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <HomeCard
                        key={video.id}
                        video={video}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;