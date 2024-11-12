import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import LongCard from "../components/shared/LongCard";
import Filters from "../components/shared/Filters";
import { useCallback } from "react";
import { useState } from "react";
import { searchQuery } from "../api/videos";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
import { useSelector } from "react-redux";

const Results = () => {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const filters = useSelector((state) => state.filters);
    const [loading, setLoading] = useState(false);

    const fetchVideos = useCallback(async (searchText) => {
        setLoading(true);
        try {
            const response = await searchQuery(searchText);
            if (response.success) {
                setVideos(response.videos)
            } else {
                toast.error(response.error)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const searchText = searchParams.get("search_query");
        fetchVideos(searchText);
    }, [searchParams, fetchVideos]);

    const filteredVideos = useMemo(() => {
        let filteredVideos = videos;

        const { uploadDate, duration, features, sortBy } = filters;

        // Filter by upload date
        if (uploadDate === 'Last hour') {
            const lastHour = new Date();
            lastHour.setHours(lastHour.getHours() - 1);
            filteredVideos = filteredVideos.filter(video => new Date(video.createdAt) >= lastHour);
        } else if (uploadDate === 'Today') {
            const today = new Date();
            filteredVideos = filteredVideos.filter(video => {
                const videoDate = new Date(video.createdAt);
                return (
                    videoDate.getFullYear() === today.getFullYear() &&
                    videoDate.getMonth() === today.getMonth() &&
                    videoDate.getDate() === today.getDate()
                );
            });
        } else if (uploadDate === 'This week') {
            const currentDate = new Date();
            const oneWeekAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
            filteredVideos = filteredVideos.filter(video => new Date(video.createdAt) >= oneWeekAgo);
        } else if (uploadDate === 'This month') {
            const currentDate = new Date();
            const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            filteredVideos = filteredVideos.filter(video => new Date(video.createdAt) >= oneMonthAgo);
        } else if (uploadDate === 'This year') {
            const currentDate = new Date();
            const oneYearAgo = new Date(currentDate.getFullYear(), 0, 1);
            filteredVideos = filteredVideos.filter(video => new Date(video.createdAt) >= oneYearAgo);
        }

        // Filter by duration
        if (duration) {
            filteredVideos = filteredVideos.filter(video => {
                const videoDuration = video.duration;
                if (duration === "Under 4 minutes" && videoDuration >= 240) {
                    return false;
                } else if (duration === "4 - 20 minutes" && (videoDuration < 240 || videoDuration > 1200)) {
                    return false;
                } else if (duration === "Over 20 minutes" && videoDuration <= 1200) {
                    return false;
                }
                return true;
            });
        }

        // Filter by features
        if (features.length > 0) {
            filteredVideos = filteredVideos.filter(video => {
                const videoFeatures = [];
                if (video.likes.length > 0) {
                    videoFeatures.push("Liked");
                }
                if (video.comments.length > 0) {
                    videoFeatures.push("Comments");
                }
                return features.every(f => videoFeatures.includes(f));
            });
        }

        // Sort by
        if (sortBy === "Upload date") {
            filteredVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "View count") {
            filteredVideos.sort((a, b) => b.views - a.views);
        }

        return filteredVideos;
    }, [videos, filters]);

    if (loading) return <Loader />

    return (
        <div className="mx-8 flex flex-col gap-2">
            <div className="flex justify-end">
                <Filters />
            </div>
            <div className="flex justify-center items-center flex-col">
                {filteredVideos.length > 0 && filteredVideos.map((video, index) => <LongCard key={index} video={video} />)}
            </div>
        </div>
    )
}

export default Results