import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Upload } from "lucide-react";
import { createChannel, getUserMe } from '../../api/user';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import PropTypes from 'prop-types';

const ImagePreview = ({ file, label, className }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }, [file]);

    return (
        <div className="mt-2">
            {preview ? (
                <div className="relative">
                    <img
                        src={preview}
                        alt={`${label} preview`}
                        className={className}
                    />
                    <p className="mt-1 text-sm text-muted-foreground">{file.name}</p>
                </div>
            ) : (
                <div className={`flex flex-col items-center justify-center border border-dashed bg-muted/50 ${className}`}>
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No {label} selected</p>
                </div>
            )}
        </div>
    );
};

ImagePreview.propTypes = {
    file: PropTypes.object,
    label: PropTypes.string,
    className: PropTypes.string,
};

const CreateChannel = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, watch } = useForm();

    const avatarFile = watch('avatar')?.[0];
    const bannerFile = watch('banner')?.[0];

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            if (data.avatar?.[0]) formData.append('avatar', data.avatar[0]);
            if (data.banner?.[0]) formData.append('banner', data.banner[0]);

            const response = await createChannel(formData);

            if (response.success) {
                console.log('Form submitted successfully:', response);
                toast.success('Channel created successfully!');
                await getUserMe();
                window.location.reload();
            } else {
                console.error('Error submitting form:', response.error);
                toast.error(response.error);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create Channel</CardTitle>
                    <CardDescription>
                        Fill in the details below to create a new channel
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8">
                        {/* Image Upload Section */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="banner">Banner Image</Label>
                                <Input
                                    id="banner"
                                    type="file"
                                    accept="image/*"
                                    {...register('banner')}
                                    className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                <ImagePreview
                                    file={bannerFile}
                                    label="banner"
                                    className="w-full h-48 md:h-60 rounded-lg object-cover"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="avatar">Profile Image</Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    {...register('avatar')}
                                    className="file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                <div className="flex justify-center md:justify-start">
                                    <ImagePreview
                                        file={avatarFile}
                                        label="avatar"
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Channel Details Section */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Channel Name</Label>
                                <Input
                                    id="name"
                                    {...register('name', { required: true })}
                                    placeholder="Enter channel name"
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    {...register('description')}
                                    placeholder="Describe your channel"
                                    rows={4}
                                    className="max-w-xl resize-none"
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button type="submit" className="w-full max-w-xl mx-auto" disabled={isSubmitting}>
                            <Upload className="mr-2 h-4 w-4" />
                            {isSubmitting ? 'Creating...' : 'Create Channel'}
                        </Button>
                    </CardFooter>
                    <div>
                        {isSubmitting && <div className="w-full h-screen bg-black/30 z-50 flex flex-col items-center justify-center absolute inset-0">
                            <Loader2 className="w-12 h-12 animate-spin text-rose-500" />
                            <span className="text-white font-medium text-xl">
                                Submitting
                            </span>
                        </div>}
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateChannel;