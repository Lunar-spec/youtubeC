import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RiVideoUploadFill } from "react-icons/ri";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { uploadVideo } from "../../api/videos";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchChannel } from "../../redux/channelSlice";
import { useEffect } from "react";
import { useCallback } from "react";

const UploadVideoDialog = () => {
    const [step, setStep] = useState(1);
    const [videoPreview, setVideoPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            thumbnail: null,
            video: null,
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            // Create FormData object
            const formData = new FormData();

            // Append text fields
            formData.append('title', data.title);
            formData.append('description', data.description);

            // Get files from state since they're managed separately
            const videoFile = form.getValues('video');
            const thumbnailFile = form.getValues('thumbnail');

            // Append files if they exist
            if (videoFile) {
                formData.append('video', videoFile);
            }
            if (thumbnailFile) {
                formData.append('thumbnail', thumbnailFile);
            }

            const response = await uploadVideo(formData);

            if (response.success) {
                toast.success("Video uploaded successfully!");
                dispatch(fetchChannel());
                resetAndClose();
            } else {
                toast.error(response.error || "Failed to upload video");
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.error("An error occurred while uploading the video");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetAndClose = () => {
        // Reset form
        form.reset();
        // Clear previews
        setVideoPreview(null);
        setImagePreview(null);
        // Reset step
        setStep(1);
        // Close dialog
        setOpen(false);
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setValue("video", file);
            setVideoPreview(URL.createObjectURL(file));
            setStep(2);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setValue("thumbnail", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Cleanup function for object URLs
    const cleanup = useCallback(() => {
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
    }, [videoPreview, imagePreview]);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                resetAndClose();
            }
            setOpen(isOpen);
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <RiVideoUploadFill className="text-xl mr-2" />
                    Upload Video
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {step === 1 ? "Upload Video" : "Video Details"}
                    </DialogTitle>
                </DialogHeader>

                {step === 1 ? (
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="video">Upload your video</Label>
                        <Input
                            id="video"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="cursor-pointer"
                        />
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Preview Section */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {videoPreview && (
                                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                                        <video
                                            src={videoPreview}
                                            className="w-full h-full object-cover"
                                            controls
                                        />
                                    </div>
                                )}
                                {imagePreview && (
                                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                                        <img
                                            src={imagePreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name="title"
                                rules={{ required: "Title is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Video title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                rules={{ required: "Description is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Video description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="thumbnail"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    handleImageChange(e);
                                                }}
                                                className="cursor-pointer"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Select a thumbnail for your video
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    disabled={isSubmitting}
                                >
                                    Back
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Uploading..." : "Upload"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UploadVideoDialog;