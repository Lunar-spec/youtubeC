import { Pencil, Trash2, Video } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import PropTypes from 'prop-types';
import { deleteVideo } from '../../api/videos';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannel } from '../../redux/channelSlice';
import UploadVideoDialog from './UploadVideoDialog';
import { Link } from 'react-router-dom';

const ChannelLayout = ({ channelData }) => {
    const [videoToDelete, setVideoToDelete] = useState(null);
    const dispatch = useDispatch();

    const handleEdit = (video) => {
        toast.error('Edit video functionality not implemented yet. Will be added soon.');
        console.log("Edit video:", video);
    };

    const handleDelete = (video) => {
        setVideoToDelete(video);
    };

    const confirmDelete = async () => {
        const response = await deleteVideo(videoToDelete.id);
        if (response.success) {
            toast.success('Video deleted successfully!');
            dispatch(fetchChannel());
        } else {
            console.error('Error deleting video:', response.error);
        }
        setVideoToDelete(null);
    };

    return (
        <div className="w-full">
            {/* Banner Section */}
            <div className="w-full h-48 md:h-64">
                <img
                    src={channelData.channel.bannerUrl}
                    alt="Channel Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Channel Info Section */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-6 py-6">
                    {/* Avatar */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white">
                        <img
                            src={channelData.channel.avatarUrl}
                            alt="Channel Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Channel Details */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">{channelData.channel.name}</h1>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">
                                {channelData.channel.videos?.length || 0} videos
                            </span>
                            <span className="text-sm text-gray-600">
                                {channelData.channel.subscribers || 0} subscribers
                            </span>
                        </div>
                        <p className="text-gray-600 mt-2">{channelData.channel.description}</p>
                        <div className="mt-2">
                            <span className="text-sm text-gray-500">
                                Created on {new Date(channelData.channel.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Videos Section */}
                <div className="mt-8 border-t pt-6">
                    <div className="flex gap-4 items-center mb-6">
                        <h2 className="text-xl font-semibold">Videos</h2>
                        <UploadVideoDialog />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {channelData.channel.videos?.map((video) => (
                            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <Link to={`/watch?v=${video.id}`}>
                                    <div className="relative aspect-video">
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                </Link>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{video.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{video.views} views</span>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(video)}
                                            >
                                                <Pencil className="h-4 w-4 text-sky-500" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(video)}
                                            >
                                                <Trash2 className="h-4 w-4 text-rose-500" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* No Videos Message */}
                    {(!channelData.channel.videos || channelData.channel.videos.length === 0) && (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Video className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No videos</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Get started by uploading your first video.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!videoToDelete} onOpenChange={() => setVideoToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the video
                            &quot;{videoToDelete?.title}&quot;.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

ChannelLayout.propTypes = {
    channelData: PropTypes.object.isRequired,
};

export default ChannelLayout;