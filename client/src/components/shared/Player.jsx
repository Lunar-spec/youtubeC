import { useState, useRef, useEffect } from 'react';
import {
    Maximize,
    Settings,
    Subtitles,
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import PropTypes from 'prop-types';
import { IoPause, IoPlay, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

const Player = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isHoveringProgress, setIsHoveringProgress] = useState(false);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const handleVolumeChange = (newValue) => {
        const volumeValue = newValue[0];
        setVolume(volumeValue);
        videoRef.current.volume = volumeValue;
        setIsMuted(volumeValue === 0);
    };

    const handleMuteToggle = () => {
        if (isMuted) {
            videoRef.current.volume = volume;
            setIsMuted(false);
        } else {
            videoRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSeek = (newValue) => {
        const seekTime = (newValue[0] / 100) * duration;
        videoRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.poster = video.thumbnailUrl;
        }

        return () => {
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
        };
    }, [video.thumbnailUrl]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group " // added z-0
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full cursor-pointer"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handlePlayPause}
                poster={video.thumbnailUrl}
            >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Big Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={handlePlayPause}
                        className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                        <IoPlay size={32} className="text-white ml-1" />
                    </button>
                </div>
            )}

            {/* Controls Container */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {/* Progress Bar */}
                <div
                    className="relative group/progress"
                    onMouseEnter={() => setIsHoveringProgress(true)}
                    onMouseLeave={() => setIsHoveringProgress(false)}
                >
                    <div className="h-1 relative">
                        <Slider
                            value={[currentTime / duration * 100]}
                            onValueChange={handleSeek}
                            className={`absolute inset-0 transition-transform duration-200 ${isHoveringProgress ? 'scale-y-300' : ''
                                }`}
                        />
                    </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between py-2">
                    {/* Left Controls */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handlePlayPause}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isPlaying ?
                                <IoPause size={22} className="text-white" /> :
                                <IoPlay size={22} className="text-white ml-0.5" />
                            }
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center group/volume">
                            <button
                                onClick={handleMuteToggle}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                                {isMuted ?
                                    <IoVolumeMute size={22} className="text-white" /> :
                                    <IoVolumeHigh size={22} className="text-white" />
                                }
                            </button>
                            <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-200">
                                <Slider
                                    value={[isMuted ? 0 : volume]}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    onValueChange={handleVolumeChange}
                                    className="ml-2"
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className="text-white text-sm">
                            <span>{formatTime(currentTime)}</span>
                            <span className="mx-1">/</span>
                            <span>{formatTime(video.duration)}</span>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Subtitles size={22} className="text-white" />
                        </button>
                        <button
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Settings size={22} className="text-white" />
                        </button>
                        <button
                            onClick={handleFullscreen}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Maximize size={22} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Title Overlay (YouTube-style) */}
            <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'
                }`}>
                <h2 className="text-white text-lg font-medium capitalize">{video.title}</h2>
            </div>
        </div>
    );
};

Player.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        channel: PropTypes.object.isRequired,
        url: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired
    }),
}

export default Player;