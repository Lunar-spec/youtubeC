import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const HomeCard = ({ video }) => {
    const formatViews = (count) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M views`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K views`;
        }
        return `${count} views`;
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Link to={`/watch?v=${video.id}`}>
            <Card className="w-full border-none shadow-none hover:bg-gray-100 transition-colors group cursor-pointer">
                {/* Thumbnail Container */}
                <div className="aspect-video w-full relative">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-xl group-hover:rounded-none transition-all duration-200"
                    />
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                        {formatDuration(video.duration)}
                    </span>
                </div>

                <CardContent className="flex gap-3 pt-3 px-1">
                    {/* Channel Avatar */}
                    <div className="flex-shrink-0">
                        <img
                            src={video.channel.avatarUrl}
                            alt={video.channel.name}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="font-medium capitalize text-base line-clamp-2 group-hover:text-blue-600">
                            {video.title}
                        </h3>

                        {/* Channel Name */}
                        <p className="text-sm text-gray-600 mt-1 truncate">
                            {video.channel.name}
                        </p>

                        {/* Views and Date */}
                        <div className="text-sm text-gray-600 flex items-center">
                            <span className="truncate">{formatViews(video.views)}</span>
                            <span className="mx-1 flex-shrink-0">•</span>
                            <span className="truncate">
                                {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

HomeCard.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnailUrl: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        views: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        channel: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            avatarUrl: PropTypes.string.isRequired,
        }).isRequired,
        _count: PropTypes.shape({
            likes: PropTypes.number.isRequired,
            dislikes: PropTypes.number.isRequired,
            comments: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};

export default HomeCard;