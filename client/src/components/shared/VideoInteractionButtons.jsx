import { PiThumbsDown, PiThumbsUp, PiThumbsUpFill, PiThumbsDownFill } from "react-icons/pi"
import PropTypes from "prop-types"

const VideoInteractionButtons = ({ video, user, onLike, onDislike }) => {
    const hasLiked = video?.likes?.some(like => like?.userId === user?.id) || false;
    const hasDisliked = video?.dislikes?.some(dislike => dislike?.userId === user?.id) || false;
    console.log(hasLiked)
    return (
        <div className="flex items-center bg-gray-100 rounded-full">
            <div
                onClick={onLike}
                className={`flex rounded-l-full px-2 py-1.5 items-center gap-2 cursor-pointer transition-all
          ${hasLiked ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 hover:bg-gray-200/80'}`}
            >
                {hasLiked ? (
                    <PiThumbsUpFill className="text-xl text-blue-600" />
                ) : (
                    <PiThumbsUp className="text-xl" />
                )}
                <span className={`font-medium text-sm ${hasLiked ? 'text-blue-600' : ''}`}>
                    {video._count.likes}
                </span>
            </div>

            <span className="text-gray-300">|</span>

            <div
                onClick={onDislike}
                className={`flex rounded-r-full px-2 py-1.5 items-center gap-2 cursor-pointer transition-all
          ${hasDisliked ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 hover:bg-gray-200/80'}`}
            >
                {hasDisliked ? (
                    <PiThumbsDownFill className="text-xl text-blue-600" />
                ) : (
                    <PiThumbsDown className="text-xl" />
                )}
                <span className={`font-medium text-sm ${hasDisliked ? 'text-blue-600' : ''}`}>
                    {video._count.dislikes}
                </span>
            </div>
        </div>
    )
}

VideoInteractionButtons.propTypes = {
    stats: PropTypes.object,
    video: PropTypes.object,
    user: PropTypes.object,
    liked: PropTypes.bool,
    disliked: PropTypes.bool,
    onLike: PropTypes.func,
    onDislike: PropTypes.func,
}

export default VideoInteractionButtons