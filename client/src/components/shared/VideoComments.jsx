import { PiThumbsUp, PiThumbsDown } from 'react-icons/pi';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const VideoComments = ({ comments, onCommentLiked, onCommentDisliked, user, onVideoUpdated }) => {
    const handleCommentLike = async (commentId) => {
        try {
            await onCommentLiked(commentId);
            onVideoUpdated();
        } catch (error) {
            console.error(error);
            toast.error('Error liking comment');
        }
    };

    const handleCommentDislike = async (commentId) => {
        try {
            await onCommentDisliked(commentId);
            onVideoUpdated();
        } catch (error) {
            console.error(error);
            toast.error('Error disliking comment');
        }
    };

    const isCommentLikedByUser = (comment) => {
        return comment.likes.some((like) => like.userId === user.id);
    };

    const isCommentDislikedByUser = (comment) => {
        return comment.dislikes.some((dislike) => dislike.userId === user.id);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-100 p-4 rounded-xl flex items-start gap-4">
                        <img
                            src={comment.user.channels?.avatarUrl || `https://api.dicebear.com/5.x/lorelei-neutral/svg?seed=${comment.user.name || "Guest"}`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-medium">{comment.user.name}</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCommentLike(comment.id)}
                                        className={`flex items-center gap-1 hover:text-sky-500 ${isCommentLikedByUser(comment) ? 'text-sky-500' : ''}`}
                                    >
                                        <PiThumbsUp />
                                        <span>{comment._count.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => handleCommentDislike(comment.id)}
                                        className={`flex items-center gap-1 hover:text-sky-500 ${isCommentDislikedByUser(comment) ? 'text-sky-500' : ''}`}
                                    >
                                        <PiThumbsDown />
                                        <span>{comment._count.dislikes}</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-base">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

VideoComments.propTypes = {
    comments: PropTypes.array.isRequired,
    onCommentLiked: PropTypes.func.isRequired,
    onCommentDisliked: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onVideoUpdated: PropTypes.func.isRequired,
};

export default VideoComments;