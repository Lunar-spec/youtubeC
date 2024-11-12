import { formatDistance } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const LongCard = ({ video }) => {
    function formatDuration(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        let formattedDuration = '';
        if (hours > 0) {
            formattedDuration += `${hours}:`;
        }
        formattedDuration += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedDuration;
    }

    return (
        <Link to={`/watch?v=${video.id}`} className="flex flex-col sm:flex-row w-full gap-4 p-4 hover:bg-gray-100 rounded-md cursor-pointer">
            {/* Thumbnail Section */}
            <div className="flex-shrink-0 relative w-full sm:w-80 aspect-video rounded-lg overflow-hidden">
                <img
                    src={video.thumbnailUrl}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {formatDuration(video.duration)}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col">
                {/* Title and Options */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-medium line-clamp-2">
                        {video.title}
                    </h3>
                    <button className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full">
                        <svg
                            className="w-6 h-6 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                        </svg>
                    </button>
                </div>

                {/* Channel and Video Info */}
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span>{video.views} views</span>
                    <span className="text-xs">•</span>
                    <span>{video._count.likes} likes</span>
                    <span className="text-xs">•</span>
                    <span>{formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}</span>
                </div>

                {/* Channel Avatar and Description */}
                <div className="flex items-start gap-2 mt-3 flex-col">
                    <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full overflow-hidden">
                            <img
                                src={video.channel.avatarUrl}
                                alt="Channel avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="text-xs font-normal">{video.channel.name}</h4>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {video.description}
                    </p>
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-2">
                    {video._count.comments > 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs font-semibold rounded-full">Comments</span>
                    )}
                    {video._count.likes > 0 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs font-semibold rounded-full">Liked</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

LongCard.propTypes = {
    video: PropTypes.object.isRequired,
};

export default LongCard;