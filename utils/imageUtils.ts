import { toast } from "react-hot-toast";

export interface ImageProcessingOptions {
    maxSizeMB?: number;
    quality?: number;
    convertToJPEG?: boolean;
    showToast?: boolean;
}

export interface ProcessedImageResult {
    success: boolean;
    file?: File;
    previewUrl?: string;
    error?: string;
}

/**
 * Processes an image file with HEIC conversion, size validation, and optimization
 * @param file - The input file to process
 * @param options - Processing options
 * @returns Promise<ProcessedImageResult>
 */
export const processImage = async (
    file: File,
    options: ImageProcessingOptions = {}
): Promise<ProcessedImageResult> => {
    const {
        maxSizeMB = 10,
        quality = 0.8,
        convertToJPEG = true,
        showToast = true,
    } = options;

    try {
        // Validate file exists
        if (!file) {
            const error = "No file selected";
            if (showToast) toast.error(error);
            return { success: false, error };
        }

        // Check file size
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            const error = `Image size should be less than ${maxSizeMB}MB`;
            if (showToast) toast.error(error);
            return { success: false, error };
        }

        let processedFile = file;

        // Handle HEIC/HEIF conversion
        if (file.type === "image/heic" || file.type === "image/heif") {
            try {
                const heic2any = (await import("heic2any")).default;
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality,
                });

                // Handle both single Blob and Blob array cases
                const finalBlob = Array.isArray(convertedBlob)
                    ? convertedBlob[0]
                    : convertedBlob;

                // Convert blob to File
                processedFile = new File(
                    [finalBlob],
                    file.name.replace(/\.(heic|heif)$/i, ".jpg"),
                    {
                        type: "image/jpeg",
                    }
                );
            } catch (heicError) {
                console.error("HEIC conversion error:", heicError);
                const error =
                    "Failed to convert HEIC image. Please try a different format.";
                if (showToast) toast.error(error);
                return { success: false, error };
            }
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(processedFile);

        return {
            success: true,
            file: processedFile,
            previewUrl,
        };
    } catch (error) {
        console.error("Image processing error:", error);
        const errorMessage = "Failed to process image. Please try again.";
        if (showToast) toast.error(errorMessage);
        return { success: false, error: errorMessage };
    }
};

/**
 * Handles image file selection and processing
 * @param fileInput - HTMLInputElement file input
 * @param options - Processing options
 * @returns Promise<ProcessedImageResult>
 */
export const handleImageUpload = async (
    fileInput: HTMLInputElement,
    options: ImageProcessingOptions = {}
): Promise<ProcessedImageResult> => {
    const file = fileInput.files?.[0];
    if (!file) {
        const error = "No file selected";
        if (options.showToast !== false) toast.error(error);
        return { success: false, error };
    }

    return processImage(file, options);
};

/**
 * Validates if a file is a valid image
 * @param file - File to validate
 * @returns boolean
 */
export const isValidImageFile = (file: File): boolean => {
    const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic",
        "image/heif",
    ];
    return validTypes.includes(file.type);
};

/**
 * Formats file size in human readable format
 * @param bytes - File size in bytes
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Cleanup function to revoke object URLs
 * @param urls - Array of URLs to cleanup
 */
export const cleanupImageUrls = (urls: string[]): void => {
    urls.forEach((url) => {
        if (url && url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
        }
    });
};

/* 
Usage Examples:

1. Basic usage with default options (10MB limit, 0.8 quality, HEIC conversion):
   const result = await processImage(file);
   if (result.success) {
     setPreviewUrl(result.previewUrl);
     uploadFile(result.file);
   }

2. Custom options:
   const result = await processImage(file, {
     maxSizeMB: 5,
     quality: 0.9,
     showToast: false
   });

3. Using with file input:
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (!file) return;
     
     const result = await processImage(file);
     if (result.success) {
       setImageFile(result.file);
       setPreviewUrl(result.previewUrl);
     }
   };

4. Using the handleImageUpload helper:
   const handleUpload = async () => {
     const result = await handleImageUpload(fileInputRef.current);
     if (result.success) {
       // Handle success
     }
   };
*/
