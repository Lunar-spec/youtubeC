import { useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Upload, X } from 'lucide-react';

const VideoUpload = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
    });
    const [uploadComplete, setUploadComplete] = useState(false);
    const [videoId, setVideoId] = useState('');

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        // Simulate upload process
        const generatedId = Math.random().toString(36).substr(2, 9);
        setVideoId(generatedId);
        setUploadComplete(true);
    };

    const resetForm = () => {
        setVideoFile(null);
        setThumbnailFile(null);
        setVideoDetails({ title: '', description: '' });
        setUploadComplete(false);
        setVideoId('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-black text-white hover:bg-gray-800">
                    Upload videos
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>
                        {uploadComplete ? 'Upload Complete!' : 'Upload Video'}
                    </DialogTitle>
                </DialogHeader>

                {uploadComplete ? (
                    <div className="space-y-4 p-4">
                        <p className="text-green-600 font-medium">Your video has been uploaded successfully!</p>
                        <div className="bg-gray-100 p-3 rounded">
                            <p className="text-sm">Video URL:</p>
                            <code className="block mt-1 text-blue-600">
                                {window.location.hostname}/watch?v={videoId}
                            </code>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button onClick={resetForm}>Upload Another Video</Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left side - Upload and Details */}
                        <div className="space-y-4">
                            {!videoFile ? (
                                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        id="video-upload"
                                        onChange={handleVideoUpload}
                                    />
                                    <Label
                                        htmlFor="video-upload"
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <Upload className="h-10 w-10 text-gray-400" />
                                        <span className="text-sm text-gray-600">Click to upload video</span>
                                    </Label>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative bg-gray-100 p-4 rounded">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={() => setVideoFile(null)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <p className="text-sm">Selected video: {videoFile.name}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={videoDetails.title}
                                                onChange={(e) => setVideoDetails(prev => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))}
                                                placeholder="Enter video title"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={videoDetails.description}
                                                onChange={(e) => setVideoDetails(prev => ({
                                                    ...prev,
                                                    description: e.target.value
                                                }))}
                                                placeholder="Enter video description"
                                                rows={4}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="thumbnail">Thumbnail</Label>
                                            <Input
                                                id="thumbnail"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleThumbnailUpload}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right side - Preview */}
                        <div className="space-y-4">
                            {videoFile && (
                                <div className="space-y-4">
                                    <h3 className="font-medium">Preview</h3>
                                    {thumbnailFile ? (
                                        <img
                                            src={thumbnailFile}
                                            alt="Video thumbnail"
                                            className="w-full aspect-video object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-full aspect-video bg-gray-100 rounded flex items-center justify-center">
                                            <p className="text-sm text-gray-500">Upload a thumbnail</p>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium">{videoDetails.title || 'Untitled Video'}</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {videoDetails.description || 'No description'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {videoFile && !uploadComplete && (
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Upload
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default VideoUpload;