"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import {
    RenderEmptyState,
    RenderErrorState,
    RenderUploadedState,
    RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: "image" | "video";
}

export function FileUploader() {
    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        fileType: "image",
    });

    const uploadFile = async (file: File) => {
        setFileState((prev) => ({
            ...prev,
            uploading: true,
            progress: 0,
        }));

        try {
            const presignedUrlResponse = await fetch("/api/s3/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    isImage: true,
                }),
            });

            if (!presignedUrlResponse.ok) {
                const errorData = await presignedUrlResponse.json();
                console.error("API Error:", errorData);
                toast.error("Failed to get presigned url");
                setFileState((prev) => ({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true,
                }));
                return;
            }

            const { presignedUrl, key } = await presignedUrlResponse.json();

            await new Promise<void>((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentageCompleted =
                            (event.loaded / event.total) * 100;
                        setFileState((prev) => ({
                            ...prev,
                            progress: Math.round(percentageCompleted),
                        }));
                    }
                };

                xhr.onload = () => {
                    console.log("XHR Response:", {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        responseText: xhr.responseText,
                        headers: xhr.getAllResponseHeaders(),
                    });

                    if (xhr.status === 200 || xhr.status === 204) {
                        setFileState((prev) => ({
                            ...prev,
                            uploading: false,
                            progress: 100,
                            error: false,
                            key,
                        }));
                        toast.success("File uploaded successfully");
                        resolve();
                    } else {
                        reject(
                            new Error(
                                `Upload failed with status ${xhr.status}`,
                            ),
                        );
                    }
                };

                xhr.onerror = (error) => {
                    reject(new Error("Network error during upload"));
                };

                xhr.open("PUT", presignedUrl);
                xhr.setRequestHeader("Content-Type", file.type);
                xhr.send(file);
            });
        } catch (error) {
            toast.error("Failed to upload file");
            setFileState((prev) => ({
                ...prev,
                uploading: false,
                error: true,
                progress: 0,
            }));
        }
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];

                if (
                    fileState.objectUrl &&
                    !fileState.objectUrl.startsWith("http")
                ) {
                    URL.revokeObjectURL(fileState.objectUrl);
                }

                setFileState({
                    file: file,
                    uploading: false,
                    progress: 0,
                    objectUrl: URL.createObjectURL(file),
                    error: false,
                    id: uuidv4(),
                    fileType: "image",
                    isDeleting: false,
                });

                uploadFile(file);
            }
        },
        [fileState.objectUrl],
    );

    async function handleRemoveFile() {
        if (fileState.isDeleting || !fileState.objectUrl) return;

        try {
            setFileState((prev) => ({
                ...prev,
                isDeleting: true,
            }));
        } catch {}
    }

    function onDropRejected(fileRejections: FileRejection[]) {
        if (fileRejections.length > 0) {
            const tooManyFiles = fileRejections.find(
                (rejection) => rejection.errors[0].code === "too-many-files",
            );

            if (tooManyFiles) {
                toast.error("Too many files selected, max is 1");
            }

            const fileSize = fileRejections.find(
                (rejection) => rejection.errors[0].code === "file-too-large",
            );

            if (fileSize) {
                toast.error("File is too large, max is 5MB");
            }
        }
    }

    const renderContent = () => {
        if (fileState.uploading) {
            return (
                <RenderUploadingState
                    file={fileState.file!}
                    progress={fileState.progress}
                />
            );
        }

        if (fileState.error) {
            return <RenderErrorState />;
        }

        if (fileState.objectUrl) {
            return <RenderUploadedState previewUrl={fileState.objectUrl} />;
        }

        return <RenderEmptyState isDragActive={isDragActive} />;
    };

    useEffect(() => {
        return () => {
            if (
                fileState.objectUrl &&
                !fileState.objectUrl.startsWith("http")
            ) {
                URL.revokeObjectURL(fileState.objectUrl);
            }
        };
    }, [fileState.objectUrl]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"],
        },
        maxFiles: 1,
        multiple: false,
        maxSize: 5 * 1024 * 1024, // 5MB
        onDropRejected,
    });

    return (
        <Card
            {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
                isDragActive
                    ? "border-primary bg-primay/10 border-solid"
                    : "border-border hover:border-primary",
            )}
        >
            <CardContent className="flex items-center justify-center h-full w-full p-4">
                <input {...getInputProps()} />
                {renderContent()}
            </CardContent>
        </Card>
    );
}
