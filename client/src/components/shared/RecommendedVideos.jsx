import { formatDistanceToNow } from 'date-fns';
import {  PiDotsThreeVerticalBold } from "react-icons/pi";
import PropTypes from 'prop-types';

const VideoCard = ({ video }) => (
    <div className="flex gap-2 group cursor-pointer items-center z-10">
        {/* Thumbnail with duration */}
        <div className="relative min-w-[168px] h-24">
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-lg z-0"
            />
            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {video.duration}
            </span>
        </div>

        {/* Video details */}
        <div className="flex-1">
            <h3 className="text-sm font-medium line-clamp-2 leading-tight mb-1">
                {video.title}
            </h3>
            <p className="text-xs text-gray-600 mb-1">
                {video.channel}
            </p>
            <p className="text-xs text-gray-600">
                {video.views} views • {formatDistanceToNow(video.uploadDate, { addSuffix: true })}
            </p>
        </div>

        {/* Three dots menu - only visible on hover */}
        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-full self-start">
            <PiDotsThreeVerticalBold className="text-lg" />
        </button>
    </div>
);

VideoCard.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        channel: PropTypes.string.isRequired,
        views: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        uploadDate: PropTypes.instanceOf(Date).isRequired
    })
};

const RecommendedVideos = () => {
    // Dummy data array
    const videos = [
        {
            id: 1,
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            title: "Complete Web Development Bootcamp 2024 - From Zero to Hero",
            channel: "TechMaster Pro",
            views: "256K",
            duration: "12:45",
            uploadDate: new Date(2024, 9, 15)
        },
        {
            id: 2,
            thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
            title: "Advanced Machine Learning Concepts Explained Simply",
            channel: "AI Education",
            views: "189K",
            duration: "18:22",
            uploadDate: new Date(2024, 9, 20)
        },
        {
            id: 3,
            thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692",
            title: "Modern JavaScript Features Every Developer Should Know",
            channel: "CodeWithMe",
            views: "125K",
            duration: "15:30",
            uploadDate: new Date(2024, 9, 25)
        },
        {
            id: 4,
            thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
            title: "Building Scalable Applications with React and Node.js",
            channel: "FullStack Mastery",
            views: "98K",
            duration: "22:15",
            uploadDate: new Date(2024, 9, 28)
        },
        {
            id: 5,
            thumbnail: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892",
            title: "Data Structures and Algorithms - Complete Course",
            channel: "CS Fundamentals",
            views: "320K",
            duration: "25:40",
            uploadDate: new Date(2024, 9, 29)
        },
        {
            id: 6,
            thumbnail: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085",
            title: "UI/UX Design Principles for Developers",
            channel: "Design Masters",
            views: "145K",
            duration: "16:55",
            uploadDate: new Date(2024, 9, 29)
        },
        {
            id: 7,
            thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
            title: "Cybersecurity Fundamentals: Protect Your Applications",
            channel: "Security Ninja",
            views: "203K",
            duration: "28:15",
            uploadDate: new Date(2024, 9, 14)
        },
        {
            id: 8,
            thumbnail: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
            title: "Docker & Kubernetes: Complete Container Guide 2024",
            channel: "Cloud Masters",
            views: "167K",
            duration: "32:10",
            uploadDate: new Date(2024, 9, 18)
        },
        {
            id: 9,
            thumbnail: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2",
            title: "GraphQL vs REST API: Which One Should You Choose?",
            channel: "API Guru",
            views: "89K",
            duration: "19:45",
            uploadDate: new Date(2024, 9, 22)
        },
        // {
        //     id: 10,
        //     thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        //     title: "Clean Code Principles - Write Better Code Today",
        //     channel: "Code Quality Pro",
        //     views: "142K",
        //     duration: "24:30",
        //     uploadDate: new Date(2024, 9, 24)
        // },
        // {
        //     id: 11,
        //     thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
        //     title: "Python for Data Science: Complete Tutorial 2024",
        //     channel: "Data Science Hub",
        //     views: "278K",
        //     duration: "45:20",
        //     uploadDate: new Date(2024, 9, 26)
        // },
        // {
        //     id: 12,
        //     thumbnail: "https://images.unsplash.com/photo-1550439062-609e1531270e",
        //     title: "DevOps Pipeline Implementation from Scratch",
        //     channel: "DevOps Master",
        //     views: "94K",
        //     duration: "36:45",
        //     uploadDate: new Date(2024, 9, 27)
        // },
        // {
        //     id: 13,
        //     thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
        //     title: "Blockchain Development: Create Your First dApp",
        //     channel: "Crypto Dev",
        //     views: "156K",
        //     duration: "41:30",
        //     uploadDate: new Date(2024, 9, 28)
        // },
        // {
        //     id: 14,
        //     thumbnail: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81",
        //     title: "iOS App Development with Swift - Beginner to Pro",
        //     channel: "Mobile Ninja",
        //     views: "183K",
        //     duration: "27:15",
        //     uploadDate: new Date(2024, 9, 29)
        // },
        // {
        //     id: 15,
        //     thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
        //     title: "Best Practices for Testing React Applications",
        //     channel: "React Masters",
        //     views: "112K",
        //     duration: "23:40",
        //     uploadDate: new Date(2024, 9, 29)
        // }
    ];

    return (
        <div className="flex flex-col">
            <div className="font-medium mb-4">Recommended videos</div>
            <div className="flex flex-col gap-4">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

RecommendedVideos.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.number,
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        channel: PropTypes.string,
        views: PropTypes.string,
        duration: PropTypes.string,
        uploadDate: PropTypes.instanceOf(Date)
    })
}

export default RecommendedVideos;