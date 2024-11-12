import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import VideoLayout from "../components/shared/VideoLayout";
import Loader from "../components/shared/Loader";

const VideoPage = () => {
    const [videoId, setVideoId] = useState("");
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const id = searchParams.get("v")

    useEffect(() => {
        if (id) {
            setVideoId(id)
            setLoading(false)
        }
    }, [searchParams, videoId, id])

    if (loading) {
        return <Loader />
    }

    if (!videoId) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex items-center justify-center flex-col">
                <img src="/images/unavailable_video.png" alt="No video" className="w-1/3" />
                <div className="flex flex-col gap-8 items-center justify-center">
                    <h1 className="text-2xl">This video isn&apos;t available anymore</h1>
                    <Link to="/" >
                        <Button variant="outline" className="uppercase rounded-full hover:bg-sky-500/20 hover:border-transparent hover:text-sky-600  text-sky-500">Go to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="relative z-0"> {/* Added wrapper */}
                <VideoLayout videoId={videoId} />
            </div>
        </div>
    )
}

export default VideoPage