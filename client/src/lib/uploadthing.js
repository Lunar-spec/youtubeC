import { generateUploadDropzone, generateUploadButton } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react";

const BASE_URI = import.meta.env.VITE_API_BASE_URL || "https://localhost:5000/api";

export const { useUploadThing } = generateReactHelpers({
    url: `${BASE_URI}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone({
    url: `${BASE_URI}/api/uploadthing`,
});
export const UploadButton = generateUploadButton({
    url: `${BASE_URI}/api/uploadthing`,
});