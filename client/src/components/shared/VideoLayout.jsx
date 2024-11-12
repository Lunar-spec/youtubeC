import { Button } from "../ui/button"
import Player from "./Player"
import { PiDotsThreeBold, PiDownloadSimpleLight, PiShareFatLight } from "react-icons/pi"
import PropTypes from "prop-types"
import RecommendedVideos from "./RecommendedVideos"
import { Input } from "../ui/input"
import { useEffect } from "react"
import { useCallback } from "react"
import { addComment, dislikeComment, dislikeVideo, getVideo, getVideoStats, likeComment, likeVideo } from "../../api/videos";
// import {getCommentsStats} from "../../api/videos"
import toast from "react-hot-toast"
import { useState } from "react"
import { formatDistance } from "date-fns"
import Loader from "./Loader"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducer"
import VideoInteractionButtons from "./VideoInteractionButtons"
import VideoComments from "./VideoComments"

const VideoLayout = ({ videoId }) => {
    const [video, setVideo] = useState(null)

    const [comment, setComment] = useState('');
    // const [stats, setStats] = useState(null);

    const { user } = useSelector(selectUser)

    const fetchStats = useCallback(async () => {
        const response = await getVideoStats(videoId);

        if (response.success) {
            // setStats(response.stats);
        } else {
            toast.error("Error fetching video")
        }
    }, [videoId]);

    // Update the handleLike function
    const handleLike = async (commentId) => {
        if (!user) {
            toast.error('You must be logged in to add a like');
            return;
        }

        try {
            const response = await likeComment(commentId);

            if (response.success) {
                toast.success("Like updated successfully");
                // setLiked(true)
                // setDisliked(false)
                // fetchStats()
            } else {
                toast.error("Error updating like");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating like");
        }
    };

    // Update the handleDislike function
    const handleDislike = async (commentId) => {
        if (!user) {
            toast.error('You must be logged in to dislike');
            return;
        }

        try {
            const response = await dislikeComment(commentId);

            if (response.success) {
                toast.success("Dislike updated successfully");
                // setDisliked(true)
                // setLiked(false)
                // fetchStats()
            } else {
                toast.error("Error updating dislike");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating dislike");
        }
    };

    const fetchVideo = useCallback(async () => {
        const response = await getVideo(videoId);

        if (response.success) {
            // toast.success("Video fetched successfully")
            setVideo(response.video)
        } else {
            toast.error("Error fetching video")
        }
    }, [videoId]);

    // const fetchCommentStats = useCallback(async (commentId) => {
    //     try {
    //         const response = await getCommentsStats(commentId);
    //         if (response.success) {
    //             // toast.success("Video fetched successfully")
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);


    useEffect(() => {
        fetchVideo();
        // fetchStats();
    }, [videoId, fetchVideo, fetchStats]);

    // useEffect(() => {
    //     if (video?.comments) {
    //         video.comments.forEach(comment => {
    //             fetchCommentStats(comment.id);
    //         });
    //     }
    // }, [video, fetchCommentStats]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to add a comment');
            return;
        }

        try {
            const response = await addComment(videoId, comment);

            if (response.success) {
                toast.success("Comment added successfully");
                setComment('');
                fetchVideo();
            } else {
                toast.error("Error adding comment");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error adding comment");
        }
    }

    const handleLikeSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to add a like');
            return;
        }

        try {
            const response = await likeVideo(videoId);

            if (response.success) {
                // toast.success("Video liked successfully");
                fetchVideo();
                fetchStats();
            } else {
                toast.error("Error liking video");
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(video)

    const handleDislikeSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('You must be logged in to add a dislike');
            return;
        }

        try {
            const response = await dislikeVideo(videoId);

            if (response.success) {
                // toast.success("Video disliked successfully");
                fetchVideo();
                fetchStats();
            } else {
                toast.error("Error disliking video");
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!video) return <Loader />

    return (
        <div className="flex gap-6 flex-col md:flex-row">
            <div className="flex md:w-3/4 w-full flex-col gap-4">
                <Player video={video} />
                <div>
                    <h2 className="text-xl font-semibold capitalize">{video.title}</h2>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <img src={video.channel.avatarUrl} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
                        <span className="flex flex-col">
                            <p className="text-base font-medium">{video.channel.name}</p>
                            <p className="text-xs text-gray-400">401k Subscribers</p>
                        </span>
                        <Button variant="default" className="rounded-full ">Subscribe</Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <VideoInteractionButtons
                            video={video}
                            user={user}
                            onLike={handleLikeSubmit}
                            onDislike={handleDislikeSubmit}
                        />
                        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 hover:bg-gray-200/80 cursor-pointer">
                            <PiShareFatLight className="text-xl" />
                            <span className="font-medium text-sm">Share</span>
                        </div>
                        <div className="md:flex hidden items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 hover:bg-gray-200/80 cursor-pointer">
                            <PiDownloadSimpleLight className="text-xl" />
                            <span className="font-medium text-sm">Download</span>
                        </div>
                        <div className="md:flex hidden items-center gap-2 rounded-full bg-gray-100 px-2 py-1.5 hover:bg-gray-200/80 cursor-pointer">
                            <PiDotsThreeBold className="text-xl" />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-xl flex flex-col">
                    <div className="flex gap-4 font-semibold">
                        <span>{video.views} Views</span>
                        <span>{formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}</span>
                    </div>
                    <p className="text-base">{video.description}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">{video._count.comments} Comments</h2>
                    <form onSubmit={handleCommentSubmit} className="flex gap-4">
                        <img
                            src={user?.channels?.avatarUrl || `https://api.dicebear.com/5.x/lorelei-neutral/svg?seed=${user?.name || "Guest"}`}
                            alt="avatar" className="w-10 rounded-full object-cover" />
                        <Input placeholder="Add a comment..." value={comment} onChange={e => setComment(e.target.value)} />
                        <Button variant="secondary" className="rounded-full">Cancel</Button>
                        <Button variant="default" className="rounded-full bg-sky-600 hover:bg-sky-500">Comment</Button>
                    </form>
                    <div className="flex flex-col gap-4">
                        <VideoComments
                            comments={video.comments}
                            onCommentLiked={handleLike}
                            onCommentDisliked={handleDislike}
                            user={user}
                            onVideoUpdated={fetchVideo}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-1/4">
                <RecommendedVideos />
            </div>
        </div>
    )
}

VideoLayout.propTypes = {
    videoId: PropTypes.string
}

export default VideoLayout